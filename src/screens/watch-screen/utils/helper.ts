export const GetDurationFormat = (duration: number) => {
    const time = duration / 1000;
    const minutes = Math.floor(time / 60);
    const timeForSeconds = time - minutes * 60;
    const seconds = Math.floor(timeForSeconds);
    const secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${secondsReadable}`;
};