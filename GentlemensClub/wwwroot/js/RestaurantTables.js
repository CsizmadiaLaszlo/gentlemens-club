$("#mapsterimage").mapster({
    fillColor: '338833',
    fillOpacity: 0.5,
    isSelectable: false,
    onClick: function(e) {
        alert("Clicked the " + this.id);
    }
});