(function () {
    
    drawGrid = function () {

        var randoms = Array(6 * 6).fill(0).map(function () { return Math.floor(11 + Math.random() * 66) });
        var indexes =  [];
        while(indexes.length < 18){
            var r = Math.floor(Math.random() * (6*6));
            if(indexes.indexOf(r) === -1) {indexes.push(r);};
        }
        while (indexes.length > 0){
            randoms[indexes[indexes.length -1]] = ((Math.floor(indexes[indexes.length -1]/6) + 1) * 10) + ((indexes[indexes.length -1] < 6)? indexes[indexes.length -1]+ 1 : indexes[indexes.length -1] % 6 + 1)
            indexes.pop()
        }
        
        board = window.document.getElementById("board")
        boardHTML = ""
        for (i = 0; i < randoms.length; i++) {
            if (i == 0) {
                boardHTML += "<tr>"
            }
            else if (i % 6 == 0 ){
                boardHTML += "</tr><tr>"
            }
            boardHTML += "<td>" + randoms[i] + "</td>"    
        }
        board.innerHTML = boardHTML
    }

    drawGrid();

})();
