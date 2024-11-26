import { useTranslation } from 'react-i18next';

const DIAG_1 = [
    { title: 'rackRating', value: '-' },
    { title: 'rackLife', value: '-' },
    { title: 'rackCapacity', value: '-' },
    { title: 'rackEfficiency', value: '-' },
    { title: 'rackCapacityBalance', value: '-' },
    { title: 'socBalance', value: '-' },
    { title: 'resistanceBalance', value: '-' },
]

export default function Diag_1() {
    const { t: trans } = useTranslation('translation');
    return (
        <div className="flex justify-between space-x-4">
            {DIAG_1.map((elem, index) => (
                <div key={index} className="flex-col flex-1 bg-hw-dark-2 rounded-2xl shadow-md p-3 overflow-hidden">
                    <p className="text-[15px] p-5">{trans(elem.title)}</p>
                    <p className="flex items-end justify-center p-5 border-t">{elem.value}</p>
                </div>
            ))}
        </div>
    )
}