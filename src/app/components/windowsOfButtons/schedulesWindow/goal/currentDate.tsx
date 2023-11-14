
export default function CurrentDate() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // 요일 표시 (short, long 가능)
    // year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate: string = currentDate.toLocaleDateString(undefined, options);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
}

