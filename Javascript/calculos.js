document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.operator__forms');
    const resultElement = document.querySelector('.screen');

    function formatNumber(number) {
        // Ajustamos el formato para usar puntos como separadores de miles y comas para decimales
        return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const fixedCosts = parseFloat(document.getElementById('fixed_costs').value);
        const salesPrices = parseFloat(document.getElementById('sales_prices').value);
        const unitCosts = parseFloat(document.getElementById('unit_costs').value);
        const option = parseInt(document.getElementById('option').value);

        if (isNaN(fixedCosts) || isNaN(salesPrices) || isNaN(unitCosts)) {
            alert("Por favor, ingrese valores válidos en todos los campos.");
            return;
        }
        if (fixedCosts <= 0 || salesPrices <= 0 || unitCosts <= 0) {
            alert("Los valores deben ser positivos.");
            return;
        }
        if (salesPrices <= unitCosts) {
            alert("El precio de venta unitario no puede ser menor o igual al costo variable unitario.");
            return;
        }

        let result;
        if (option === 1) { // Unidades de producto
            result = fixedCosts / (salesPrices - unitCosts);
            if (result <= 0 || !isFinite(result)) {
                resultElement.innerHTML = "<p>El resultado es inválido. Verifique los valores ingresados.</p>";
            } else {
                resultElement.innerHTML = `<p>Se necesitan vender <b>${formatNumber(result)} unidades</b> para alcanzar el punto de equilibrio</p>`;
            }
        } else if (option === 2) { // Valor monetario
            const contributionMargin = (salesPrices - unitCosts) / salesPrices;
            if (contributionMargin <= 0) {
                resultElement.innerHTML = "<p>El margen de contribución no puede ser cero o negativo. Verifique los valores ingresados.</p>";
                return;
            }
            result = fixedCosts / contributionMargin;
            if (result <= 0 || !isFinite(result)) {
                resultElement.innerHTML = "<p>El resultado es inválido. Verifique los valores ingresados.</p>";
            } else {
                resultElement.innerHTML = `<p>La empresa debe generar <b>$${formatNumber(result)} COP</b> para alcanzar el punto de equilibrio</p>`;
            }
        } else {
            alert("Por favor, seleccione un método de cálculo.");
        }
    });
});
