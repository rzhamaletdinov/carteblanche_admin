import { DatabaseMetadata } from '@adminjs/sql';
import { ActionRequest, ResourceWithOptions } from 'adminjs';

import { Components } from '../admin/component-loader.js';

export const UserResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('user'),
  options: {
    id: 'user',
    navigation: { icon: 'User' },
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      edit: {
        before: async (request: ActionRequest) => {
          if (request.payload) {
            // eslint-disable-next-line no-console
            console.log('[UserResource] Edit before hook - Original payload keys:', Object.keys(request.payload));

            // Список всех массивных полей в таблице user
            const arrayFields = ['photos', 'income_source', 'interests'];

            // Обрабатываем каждое массивное поле
            arrayFields.forEach((fieldName) => {
              const originalValue = request.payload[fieldName];
              // eslint-disable-next-line no-console
              console.log(`[UserResource] Processing array field "${fieldName}":`, {
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
                console.log(`[UserResource] Found ${fieldName}.${index}:`, value);
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
                console.log(`[UserResource] Set ${fieldName} from indexed fields:`, arrayValue);
              } else if (fieldName in request.payload) {
                // Если поле есть в payload, но не было индексированных полей
                const fieldValue = request.payload[fieldName];
                // eslint-disable-next-line no-console
                console.log(`[UserResource] ${fieldName} exists in payload:`, {
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
                  console.log(`[UserResource] Converted ${fieldName} empty value to []`);
                } else if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
                  // Дополнительная проверка на пустую строку с пробелами
                  request.payload[fieldName] = [];
                  // eslint-disable-next-line no-console
                  console.log(`[UserResource] Converted ${fieldName} whitespace-only string to []`);
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
            console.log(
              '[UserResource] Final payload array fields DETAILED:',
              JSON.stringify(arrayFieldsInfo, null, 2),
            );

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
            console.log('[UserResource] Final payload ALL FIELDS:', JSON.stringify(payloadInfo, null, 2));
            // eslint-disable-next-line no-console
            console.log('[UserResource] Final payload keys:', Object.keys(request.payload));
          }
          return request;
        },
        after: async (response: { record?: { errors?: Record<string, unknown> } }) => {
          if (response.record && response.record.errors && Object.keys(response.record?.errors).length > 0) {
            // eslint-disable-next-line no-console
            console.error('[UserResource] Edit after hook - Errors:', JSON.stringify(response.record?.errors, null, 2));
          }
          return response;
        },
      },
      show: {
        component: Components.ShowUserAction,
      },
    },
    listProperties: ['id', 'name', 'email', 'createdAt'],
    properties: {
      status: {
        isRequired: true,
        availableValues: [
          { value: 'NEW', label: 'New user' },
          { value: 'WAITING_PREMODERATION', label: 'Waiting for pre-moderation' },
          { value: 'ACTIVE', label: 'Active user' },
          { value: 'WAITING_APPROVE', label: 'Waiting for approval' },
          { value: 'DECLINED', label: 'Declined user' },
          { value: 'BANNED', label: 'Blocked user' },
        ],
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
