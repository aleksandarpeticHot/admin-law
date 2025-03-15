import { addToast } from '@heroui/react';

export function notify(message: string, type: 'success' | 'danger', description?: string) {
  return addToast({
    title: message,
    color: type,
    description
  })
}