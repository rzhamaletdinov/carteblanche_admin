import { prisma } from '../prisma.client.js';

export const PatchHook = async (request, context) => {
  // Если данные не отправлены — просто возвращаем их
  if (!request.payload) return request;

  const { record, resource } = context;

  const id = record.params.id; // ❗ ВАЖНО

  const original = await prisma.user.findUnique({
    where: { id },
  });

  const updatedFields = {};

  for (const key of Object.keys(request.payload)) {
    if (request.payload[key] !== original[key]) {
      updatedFields[key] = request.payload[key];
    }
  }

  request.payload = updatedFields;
  return request;
};
