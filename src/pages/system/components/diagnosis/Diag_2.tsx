import DiagRingChart from "../graph/DiagRingGraph"
import { useTranslation } from 'react-i18next';

const DIAG_2_A = [
    { title: 'batteryLife', value: '-' },
    { title: 'batteryEfficiency', value: '-' },
    { title: 'batteryPowerUsage', value: '-' },
    { title: 'capacityUsage', value: '-' },
]
const DIAG_2_B = [
    { title: 'actualUsableBatteryCapacity', value: '-' },
    { title: 'aging', value: '-' },
    { title: 'capacityDeviation', value: '-' },
    { title: 'residualAmountDeviation', value: '-' },
    { title: 'resistance', value: '-' },
]

export default function Diag_2() {
    const { t: trans } = useTranslation('translation');
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="flex flex-col flex-4 bg-hw-dark-2 rounded-2xl shadow-md p-3 overflow-hidden">
                    <p className="text-xl p-5">{trans('batteryRating')}</p>
                    <p className="flex-1 flex items-center justify-center p-5 border-t text-6xl">A</p>
                </div>
                <div className="flex-1">
                    <div className="flex flex-1 gap-5 bg-hw-dark-2 rounded-2xl shadow-md p-3">
                        {DIAG_2_A.map(elem => <DiagRingChart title={elem.title} />)}
                    </div>
                </div>
            </div>
            <div className="flex gap-4">                
                <div className="flex-1">
                    <div className="flex flex-1 gap-5 bg-hw-dark-2 rounded-2xl shadow-md p-3">
                        {DIAG_2_B.map(elem => <DiagRingChart title={elem.title} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}