import { useMemo } from "react";

const getMaxHeight = (height: number, maxHeight: number) => `${(height / maxHeight) * 100}%`

function Bar(props: any) {
    return (
        <div className="bar" {...props} >
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
                <Bar key={item.id} style={{ backgroundColor: item.colour, height: getMaxHeight(item.value, maxHeight) }} title={item.label} />
            ))}</div>
        </>
    )
}

export default BarChart;