const express = require('express');
const app = express();
const port = 3000;

let goods = [
    {id: 1, name: 'Товар 1', cost: 100},
    {id: 2, name: 'Товар 2', cost: 200},
    {id: 3, name: 'Товар 3', cost: 300},
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Главная страница');
});

app.get('/goods', (req, res) => {
    res.json(goods);
});

app.get('/goods/:id', (req, res) => {
    let good = goods.find(g => g.id == req.params.id);
    if (!good) return res.status(404).json({ message: 'Товар не найден.' });
    res.json(good);
});

app.post('/goods', (req, res) => {
    const { name, cost } = req.body;
    const newGood = {
        id: Date.now(),
        name,
        cost
    };

    goods.push(newGood);
    res.status(201).json(newGood);
});

app.patch('/goods/:id', (req, res) => {
    const good = goods.find(g => g.id == req.params.id);
    if (!good) return res.status(404).json({ message: 'Товар не найден' });

    const { name, cost } = req.body;

    if (name !== undefined) good.name = name;
    if (cost !== undefined) good.cost = cost;

    res.json(good);
});

app.delete('/goods/:id', (req, res) => {
    goods = goods.filter(g => g.id != req.params.id);
    res.send('Deleted');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});