export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const formatValue = (value: unknown): string => {
  if (value === null) return 'NULL';
  if (value === undefined) return 'NULL';
  if (value === '') return 'Empty';
  return String(value);
};

export const getStatusVariant = (status: string): 'primary' | 'success' | 'warning' | 'danger' => {
  switch (status) {
  case 'ACTIVE':
    return 'success';
  case 'NEW':
  case 'WAITING_PREMODERATION':
  case 'WAITING_APPROVE':
    return 'warning';
  case 'DECLINED':
  case 'BANNED':
    return 'danger';
  default:
    return 'primary';
  }
};

export const blanck = () => {}
