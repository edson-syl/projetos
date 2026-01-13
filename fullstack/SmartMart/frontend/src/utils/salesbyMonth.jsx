export function groupSalesByMonth(sales) {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const result = {};

  sales.forEach((sale) => {
    const date = new Date(sale.date);
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];

    if (!result[monthIndex]) {
      result[monthIndex] = {
        month: monthName,
        monthIndex,
        quantity: 0,
        profit: 0,
      };
    }

    result[monthIndex].quantity += sale.quantity;
    result[monthIndex].profit += sale.total_price;
  });

  return Object.values(result)
    .sort((a, b) => a.monthIndex - b.monthIndex)
    .map(({  ...rest }) => rest);
}
