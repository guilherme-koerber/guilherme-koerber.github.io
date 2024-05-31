function addRow(tableId) {
    const table = document.getElementById(tableId);
    const newRow = table.insertRow();
    const itemCell = newRow.insertCell(0);
    const quantityCell = newRow.insertCell(1);
    const unitPriceCell = newRow.insertCell(2);
    const totalPriceCell = newRow.insertCell(3);

    itemCell.innerHTML = '<input type="text" name="' + tableId.replace('Table', 'Item[]') + '" required>';
    quantityCell.innerHTML = '<input type="number" name="' + tableId.replace('Table', 'Quantity[]') + '" min="0" step="1" required>';
    unitPriceCell.innerHTML = '<input type="number" name="' + tableId.replace('Table', 'UnitPrice[]') + '" min="0" step="0.01" required>';
    totalPriceCell.innerHTML = '<input type="number" name="' + tableId.replace('Table', 'TotalPrice[]') + '" readonly>';
}

document.getElementById('partyForm').addEventListener('input', function(event) {
    if (event.target.name.endsWith('Quantity[]') || event.target.name.endsWith('UnitPrice[]')) {
        const table = event.target.closest('table');
        const rows = table.getElementsByTagName('tr');

        let totalBudget = 0;

        for (let i = 1; i < rows.length; i++) {
            const quantity = rows[i].querySelector('input[name$="Quantity[]"]').value || 0;
            const unitPrice = rows[i].querySelector('input[name$="UnitPrice[]"]').value || 0;
            const totalPriceInput = rows[i].querySelector('input[name$="TotalPrice[]"]');

            const totalPrice = quantity * unitPrice;
            totalPriceInput.value = totalPrice.toFixed(2);
            
            totalBudget += totalPrice;
        }

        document.getElementById('budget').value = totalBudget.toFixed(2);
    }
});

document.getElementById('partyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log('Planejamento da Festa:', data);

    alert('Planejamento salvo com sucesso!');
});
