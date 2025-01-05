const Timer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  console.log(time);
  return <div>Timer</div>;
};

export default Timer;
