import React, { useEffect, useState } from 'react';

interface IconProps {
    type: 'sun' | 'moon';
}

const Icon: React.FC<IconProps> = ({ type }) => {
    if (type === 'sun') {
        return (
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"></path>
            </svg>
        );
    } else if (type === 'moon') {
        return (
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"></path>
            </svg>
        );
    }

    return null;
};

const Hand = ({ deg, type }: { deg: number, type: 'min' | 'sec' | 'hr' }) => {

    let dimen: { width: string, height: string } = { width: '0', height: '0' };

    if (type == 'hr') {
        dimen = { height: '50%', width: '15px' }
    }
    if (type == 'min') {
        dimen = { height: '70%', width: '10px' }
    }
    if (type == 'sec') {
        dimen = { height: '73%', width: '1px' }
    }

    return (
        <div
            className={`absolute justify-center origin-bottom inline-flex m-auto h-[50%] w-0 left-0 right-0 rounded-full`}
            style={{ rotate: `${deg}deg` }}
        >
            <span
                className={`flex-shrink-0 bottom-0 absolute rounded-full ${type == 'sec' ? 'bg-pink-300' : ''} ${type == 'min' ? 'bg-gray-400' : ''} ${type == 'hr' ? 'bg-gray-300' : ''} `}
                style={{ ...dimen }}
            />
        </div>
    )
}

const Dial = ({ deg, value }: { deg: number, value?: number }) => {
    let lg = typeof value == 'number' ? value % 3 == 0 ? true : false : false;

    return (
        <div
            className={`absolute justify-center origin-bottom inline-flex m-auto left-0 right-0 rounded-full w-0 h-[50%]`}
            style={{ rotate: `${deg}deg` }}
        >
            <span
                className={`bg-pink-300 inline-block absolute flex-shrink-0 flex-grow-0 top-1 rounded-full ${lg ? 'w-[3px] h-4' : 'w-[1px] h-[10px]'} ${!lg && value ? '!bg-blue-300' : ''}`} />
            <span
                className="absolute inline-flex justify-center items-center top-10 flex-shrink-0 flex-grow-0 w-0 h-0 bg-blue-700"
                style={{ rotate: `${-deg}deg` }}
            >
                <span className={`${lg ? 'text-lg font-medium text-pink-300' : 'text-[14px] text-blue-300'}`}>{value}</span>
            </span>
        </div>
    );
}

const Clock = () => {
    const [{ hr24, hr, min, sec }, setTime] = useState<{ hr24: number, min: number, sec: number, hr: number, ampm?: 'AM' | 'PM' }>({ hr24: 0, hr: 0, min: 0, sec: 0 })

    let dials = [];

    for (let i = 0; i < 360; i += 6) {
        let num: any = i / 6;
        num = num % 5 == 0 ? num == 0 ? 12 : num / 5 : undefined;
        dials.push(<Dial key={`dial_${i}`} deg={i} value={num} />)
    }

    useEffect(() => {
        function paintTime() {
            const currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            let hr24 = hours;
            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours + (minutes / 60);

            minutes = minutes + (seconds / 60);

            setTime({ hr: (hours / 12) * 360, min: (minutes / 60) * 360, sec: (seconds / 60) * 360, ampm: ampm, hr24 });
        }
        paintTime();
        let interval = setInterval(paintTime, 1000)

        return () => {
            window.clearInterval(interval);
        }

    }, []);

    let icon;

    if (hr24 >= 6 && hr24 <= 18) {
        icon = <Icon type='sun' />;
    } else if ((hr24 > 18 && hr24 <= 24) || (hr24 >= 0 && hr24 < 6)) {
        icon = <Icon type='moon' />;
    }

    return (
        <div className="relative w-[350px] h-[350px] rounded-full bg-gray-800">
            {dials}
            <Hand deg={min} type='min' />
            <Hand deg={hr} type='hr' />
            <Hand deg={sec} type='sec' />
            <div
                className="inline-flex items-center justify-center absolute m-auto left-0 top-0 right-0 bottom-0 bg-gray-600 rounded-full w-10 h-10 border-2 border-gray-800 text-[22px] text-pink-300"
            >
                {icon}
            </div>
        </div>
    )
}

export default Clock