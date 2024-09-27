import React from 'react'
import GrPowerReset from '../icons/GrPowerReset'
import { GameState } from '../../ecs/components/GameState'

interface Props {
    type?: GameState
    onReset?(): void
    onClick?(): void
}

const PopUpCard = ({ type, onReset, onClick }: Props) => {
    return (
        <div className='flex flex-col border border-[#151212]  absolute  justify-center items-center bg-[#A3B396] w-[350px] h-[160px]'>
            <div className='absolute w-[calc(100%-8px)] h-[calc(100%-8px)] bg-[#151212]' />

            <span className='z-0 text-lg text-[#A3B396]'>
                {type === 'gameOver' && '(╥﹏╥)'}
                {type === 'won' && '(⌐■_■)'}
                {type === 'paused' && '(⊙_☉)'}
                {type === 'init' && '(*‿*)'}
            </span>
            <h2 className='text-[22px] z-0 text-[#A3B396] font-bold mb-4'>
                {type === 'gameOver' && 'Game Over'}
                {type === 'won' && 'You Won'}
                {type === 'paused' && 'Game Paused'}
                {type === 'init' && 'New Game'}
            </h2>
            <div className='flex space-x-2'>
                {
                    type == 'paused' && typeof onReset == 'function' &&
                    <button
                        className='inline-flex items-center space-x-1 text-[12px] font-medium py-1 px-2  z-0 border-b-[3px] border-red-500 bg-red-600 text-gray-100'
                        onClick={onReset}
                    >
                        Restart
                    </button>
                }
                <button
                    className='inline-flex items-center space-x-1 text-[12px] font-medium py-1 px-2  z-0 bg-[#A3B396] text-[#151212] border-b-[3px] border-[#6d7f5f]'
                    onClick={onClick}
                >
                    {
                        type === 'gameOver' &&
                        <>
                            <GrPowerReset /><span>Try Again</span>
                        </>
                    }
                    {
                        type === 'won' && 'Play Again'
                    }
                    {
                        type === 'paused' && 'Resume'
                    }
                    {
                        type === 'init' && 'Start'
                    }
                </button>
            </div>
        </div>
    )
}

export default PopUpCard