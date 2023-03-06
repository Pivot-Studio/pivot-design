const Warning: React.FC<any> = (props) => {
  // console.log('color', color);
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2790"
      width={props.size ?? '16'}
      height={props.size ?? '16'}
      fill={props.color ?? 'currentColor'}
    >
      <path
        d="M543.082667 161.173333a64 64 0 0 1 24.853333 24.853334l317.909333 572.224A64 64 0 0 1 829.866667 853.333333H194.133333a64 64 0 0 1-55.957333-95.082666L456.064 186.026667a64 64 0 0 1 87.018667-24.853334zM512 217.109333L194.112 789.333333H829.866667L512 217.109333zM544 661.333333v64h-64v-64h64z m0-276.437333V618.666667h-64V384.896h64z"
        fill="#007FFC"
        p-id="4418"
      ></path>
    </svg>
  );
};

export default Warning;
