const purchases = [
    {id: 1, date: '01.01.2020', values: [
        {id: 1, amount: 2000, category: 'auto'},
        {id: 2, amount: 3000, category: 'food'},
        {id: 3, amount: 300, category: 'beauty'},
    ]},
    {id: 2, date: '03.01.2020', values: [
        {id: 4, amount: 3000, category: 'auto'},
        {id: 5, amount: 30000, category: 'travel'},
    ]},
    {id: 6, date: '04.01.2020', values: [
        {id: 6, amount: 3000, category: 'food'},
    ]},
];

{
    function getMaxPurchaseQuantityDay (purchases) {
        return purchases.reduce((acc, currentValue) => 
            (currentValue.values.length > acc.values.length) ? currentValue : acc );
    }
  
    function getHighestPurchase (purchases) {
        return purchases.map(day => {
            const maxPurchaseOfDay = day.values.reduce((acc, currentValue) => currentValue.amount > acc.amount ? currentValue : acc );

            return { id: day.id, date: day.date, purchase: maxPurchaseOfDay } ;
        }).reduce((acc, day) => acc.purchase.amount > day.purchase.amount ? acc : day );
    }

    function getStatByCategories(purchases) {
        return purchases.map(purchase => purchase.values).flat()
        .reduce((acc, currentValue) => {
            const index = acc.findIndex(i => i.category === currentValue.category);
            if (index >= 0) {
                acc[index].amount += currentValue.amount;
                return acc;
            }
            return [...acc, currentValue];
        }, []);
    } 

    function getStatByDays(purchases) {
        return purchases.map(purchase => {
            const amountByDay = purchase.values.reduce((acc, currentValue) => currentValue.amount + acc, 0)

            return {date: purchase.date, amount: amountByDay}
        })
    }

    function getCategoryWithMaxPurchases(statByCategories) {
        return statByCategories.reduce((acc, currentValue) => currentValue.amount > acc.amount ? currentValue : acc )['category'];
    }

    function getDateWithMaxPurchases(statByDays) {
        return statByDays.reduce((acc, currentValue) => currentValue.amount > acc.amount ? currentValue : acc )['date'];
    }

    function getAVG(statByDays) {
        const total = statByDays.reduce((acc, currentValue) => acc + currentValue.amount, 0);
        return Number((total / statByDays.length).toFixed(2));
    }

    
    const maxPurchaseQuantityDay = getMaxPurchaseQuantityDay(purchases);
    console.log(`Максимальное количество покупок было совершено: ${maxPurchaseQuantityDay.date}`);


    const highestPurchase = getHighestPurchase(purchases)
    console.log(`Самая дорогая покупка была совершена ${highestPurchase.date} на сумму ${highestPurchase.purchase.amount} в категории '${highestPurchase.purchase.category}'`);

    const statByCategories = getStatByCategories(purchases);
    console.group("Статистика трат по категориям:");
    console.log(statByCategories);
    console.groupEnd();

    const categoryWithMaxPurchases = getCategoryWithMaxPurchases(statByCategories);
    console.log(`Категория, в которой совершено максимальное количество покупок по сумме: ${categoryWithMaxPurchases}`);


    const statByDays = getStatByDays(purchases);
    console.group("Статистика трат по дням:");
    console.log(statByDays);
    console.groupEnd();
    
    const dateWithMaxPurchases = getDateWithMaxPurchases(statByDays);
    console.log(`Дата, в которую совершено максимальное количество покупок (по суммарной стоимости): ${dateWithMaxPurchases}`);

    const avg = getAVG(statByDays);
    console.log(`Средняя сумма покупок в день: ${avg}`);
}