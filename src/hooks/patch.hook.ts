import { ActionRequest } from 'adminjs';
import { prisma } from '../prisma.client.js';

export const PatchHook = async (request: ActionRequest, context: { record: { params: { id: string } } }) => {
  // Если данные не отправлены — просто возвращаем их
  if (!request.payload) return request;

  const { record } = context;

  const id = parseInt(record.params.id, 10); // ❗ ВАЖНО

  // eslint-disable-next-line no-console
  console.log('[PatchHook] Edit before hook - Original payload keys:', Object.keys(request.payload));

  // Список всех массивных полей в таблице user
  const arrayFields = ['photos', 'income_source', 'interests'];

  // Обрабатываем каждое массивное поле
  arrayFields.forEach((fieldName) => {
    const originalValue = request.payload[fieldName];
    // eslint-disable-next-line no-console
    console.log(`[PatchHook] Processing array field "${fieldName}":`, {
      originalValue,
      type: typeof originalValue,
      isArray: Array.isArray(originalValue),
    });

    const arrayValue: string[] = [];
    let index = 0;

    // Собираем значения из fieldName.0, fieldName.1, ...
    while (`${fieldName}.${index}` in request.payload) {
      const value = request.payload[`${fieldName}.${index}`];
      // eslint-disable-next-line no-console
      console.log(`[PatchHook] Found ${fieldName}.${index}:`, value);
      if (value && value !== '__FORM_VALUE_NULL__') {
        arrayValue.push(value);
      }
      delete request.payload[`${fieldName}.${index}`];
      index += 1;
    }

    // Если собрали значения из индексированных полей, используем их
    if (index > 0) {
      request.payload[fieldName] = arrayValue;
      // eslint-disable-next-line no-console
      console.log(`[PatchHook] Set ${fieldName} from indexed fields:`, arrayValue);
    } else if (fieldName in request.payload) {
      // Если поле есть в payload, но не было индексированных полей
      const fieldValue = request.payload[fieldName];
      // eslint-disable-next-line no-console
      console.log(`[PatchHook] ${fieldName} exists in payload:`, {
        value: fieldValue,
        type: typeof fieldValue,
        isEmpty: fieldValue === '',
        isNull: fieldValue === null,
        isFormNull: fieldValue === '__FORM_VALUE_NULL__',
      });

      // Если это пустая строка или null, преобразуем в пустой массив
      if (fieldValue === '' || fieldValue === null || fieldValue === '__FORM_VALUE_NULL__') {
        request.payload[fieldName] = [];
        // eslint-disable-next-line no-console
        console.log(`[PatchHook] Converted ${fieldName} empty value to []`);
      } else if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
        // Дополнительная проверка на пустую строку с пробелами
        request.payload[fieldName] = [];
        // eslint-disable-next-line no-console
        console.log(`[PatchHook] Converted ${fieldName} whitespace-only string to []`);
      }
    }
  });

  // Удаляем служебные поля, которые не нужно обновлять
  const systemFields = ['id', 'createdAt', 'updatedAt'];
  systemFields.forEach((field) => {
    if (field in request.payload) {
      delete request.payload[field];
    }
  });

  // Удаляем поля с __FORM_VALUE_NULL__ для необязательных полей
  // (оставляем только если это явное указание установить в null)
  const optionalFields = ['job_about', 'religion_alignment', 'occupation'];
  optionalFields.forEach((field) => {
    if (request.payload[field] === '__FORM_VALUE_NULL__') {
      request.payload[field] = null;
    }
  });

  // Логируем финальный payload для массивных полей с детальной информацией
  const arrayFieldsInfo: Record<string, unknown> = {};
  arrayFields.forEach((fieldName) => {
    const value = request.payload[fieldName];
    arrayFieldsInfo[fieldName] = {
      value,
      type: typeof value,
      isArray: Array.isArray(value),
      stringified: JSON.stringify(value),
      length: Array.isArray(value) ? value.length : 'N/A',
    };
  });

  // eslint-disable-next-line no-console
  console.log('[PatchHook] Final payload array fields DETAILED:', JSON.stringify(arrayFieldsInfo, null, 2));

  // Логируем все поля payload с их типами для отладки
  const payloadInfo: Record<string, unknown> = {};
  Object.keys(request.payload).forEach((key) => {
    const value = request.payload[key];
    payloadInfo[key] = {
      value,
      type: typeof value,
      isArray: Array.isArray(value),
      isNull: value === null,
      isEmpty: value === '',
      stringified: typeof value === 'object' ? JSON.stringify(value) : String(value),
    };
  });
  // eslint-disable-next-line no-console
  console.log('[PatchHook] Final payload ALL FIELDS:', JSON.stringify(payloadInfo, null, 2));
  // eslint-disable-next-line no-console
  console.log('[PatchHook] Final payload keys:', Object.keys(request.payload));

  // Получаем оригинальные данные для сравнения
  const original = await prisma.user.findUnique({
    where: { id },
  });

  if (!original) {
    // eslint-disable-next-line no-console
    console.error(`[PatchHook] User with id ${id} not found`);
    return request;
  }

  // Сравниваем и оставляем только измененные поля
  const updatedFields: Record<string, unknown> = {};

  for (const key of Object.keys(request.payload)) {
    const newValue = request.payload[key];
    const oldValue = original[key as keyof typeof original];

    // Для массивов сравниваем как JSON строки
    if (Array.isArray(newValue) && Array.isArray(oldValue)) {
      if (JSON.stringify(newValue.sort()) !== JSON.stringify(oldValue.sort())) {
        updatedFields[key] = newValue;
      }
    } else if (newValue !== oldValue) {
      updatedFields[key] = newValue;
    }
  }

  request.payload = updatedFields;
  // eslint-disable-next-line no-console
  console.log('[PatchHook] Updated fields:', Object.keys(updatedFields));

  return request;
};
