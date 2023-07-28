const Close: React.FC<any> = (props) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1724"
      width={props.size ?? '16'}
      height={props.size ?? '16'}
      fill={props.color ?? 'currentColor'}
    >
      <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"/>
    </svg>
  );
};

export default Close;
