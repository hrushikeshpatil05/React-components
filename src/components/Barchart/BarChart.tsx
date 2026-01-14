import { useMemo } from "react";

const getMaxHeight = (height: number, maxHeight: number) => `${(height / maxHeight) * 100}%`

function Bar({ label, height, colour }: any) {
    return (
        <div className="bar-wrapper">
            <div className="bar" style={{ backgroundColor: colour, height: height }} title={label} />
            <div className="bar-label">{label}</div>
        </div>
    )
};

function BarChart({ items, transformer }: any) {

    const transformedItems = useMemo(
        () => items.map(transformer),
        [items, transformer]
    );

    const maxHeight = Math.max(...transformedItems.map((item: any) => item.value))

    return (
        <>
            <div className="chart">{transformedItems.map((item: any) => (
                <Bar key={item.id} colour={item.colour} height={getMaxHeight(item.value, maxHeight)} label={item.label} />
            ))}</div>
        </>
    )
}

export default BarChart;