const getMaxHeight = (height: number, maxHeight: number) => `${(height / maxHeight) * 100}%`

function Bar(props: any) {
    return (
        <div className="bar" {...props} />
    )
};

function BarChart({ items }: any) {

    const maxHeight = Math.max(...items.map((item: any) => item.ticketCount))

    return (
        <>
            <div className="chart">{items.map((item: any) => (
                <Bar key={item.id} style={{ backgroundColor: item.colour, height: getMaxHeight(item.ticketCount, maxHeight) }} />
            ))}</div>
        </>
    )
}

export default BarChart;