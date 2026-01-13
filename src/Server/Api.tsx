const chartData = [
    {
        id: 'dep-1',
        name: 'Legal',
        ticketCount: 32,
        colour: '#f1d05b',
    },
    {
        id: 'dep-2',
        name: 'Sales',
        ticketCount: 20,
        colour: '#58a958',
    },
    {
        id: 'dep-3',
        name: 'Engineering',
        ticketCount: 60,
        colour: '#63a6ee',
    },
    {
        id: 'dep-4',
        name: 'Manufacturing',
        ticketCount: 5,
        colour: '#4fc08d',
    },
    {
        id: 'dep-5',
        name: 'Maintenance',
        ticketCount: 14,
        colour: '#d67575',
    },
    {
        id: 'dep-6',
        name: 'Human Resourcing',
        ticketCount: 35,
        colour: '#9abf7a',
    },
    {
        id: 'dep-7',
        name: 'Events',
        ticketCount: 43,
        colour: '#73cbda',
    },
];

export const getData = () =>
    new Promise((resolve) =>
        setTimeout(resolve, 500, chartData)
    );
