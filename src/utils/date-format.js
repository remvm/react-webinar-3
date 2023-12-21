export default function formatDateTime(dateTimeString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleDateString('ru-RU', options);

  return formattedDate
}

