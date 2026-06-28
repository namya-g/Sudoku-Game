console.log("Game is running!");
let check=document.getElementById("check");
let restart=document.getElementById("restart");
let newgame=document.getElementById("newgame");
let status=document.getElementById("status");
check.addEventListener("click", function() {
    console.log("Check Answer button is working!");
});
let sudokugrid=Array.from({length:9},()=>Array(9).fill(0));
let ansgrid=Array.from({length:9},()=>Array(9).fill(0));
function ans(grid) {
    for(let i=0;i<=8;i++) {
        for(let j=0;j<=8;j++) {
            if(grid[i][j]===0) {
                for(let k=1;k<=9;k++) {
                    if(logic(grid,i,j,k)) {
                        grid[i][j]=k;
                        if(ans(grid)) return true;
                        grid[i][j]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function logic(grid,row,col,num) {
    for(let i=0;i<=8;i++) {
        if((grid[row][i]==num)||(grid[i][col]==num)) {
            return false;
    }
    }
        let r1=row-(row%3);
        let c1=col-(col%3);
        for(let i=0;i<=2;i++) {
            for(let j=0;j<=2;j++) {
                if(grid[i+r1][j+c1]==num) {
                    return false;
                }
            }
        }
    return true;
}
function fill() {
    for(let i=1;i<=81;i++) {
        let cell=document.getElementById("cell-"+i);
        cell.value="";
        cell.readOnly=false;
    }
    sudokugrid=Array.from({length:9},()=>Array(9).fill(0));
    let n=0;
    while(n<22) {
        let r=Math.floor(Math.random()*9);
        let c=Math.floor(Math.random()*9);
        let num=Math.floor(Math.random()*9)+1;
        if((sudokugrid[r][c]==0)&&(logic(sudokugrid,r,c,num))) {
            let cellid="cell-"+((r*9)+c+1);
            let cell=document.getElementById(cellid);
            cell.value=num;
            cell.readOnly=true;
            n+=1;
        }
    }
    ansgrid=sudokugrid.map(row=>[...row]);
    ans(ansgrid);
}
newgame.addEventListener("click",fill);
restart.addEventListener("click",function() {
    for(let i=1;i<=81;i++) {
        let cell=document.getElementById("cell-"+i);
        if(!cell.readOnly) {
            cell.value="";
        }
    }
    status.innerText="Entries cleared! Try again.";
})
check.addEventListener("click",function() {
    let count=1;
    let ugrid=[];
    for(let i=0;i<=8;i++) {
        let row=[];
        for(let j=0;j<=8;j++) {
            let val=document.getElementById("cell-"+count).value;
            row.push(parseInt(val)||0);
            count+=1;
        }
        ugrid.push(row);
    }
    let correct=true;
    for(let i=0;i<=8;i++) {
        for(let j=0;j<=8;j++) {
            if(ugrid[i][j]!==ansgrid[i][j]) {
                correct=false;
                break;
            }
        }
    }
    if(correct) {
        status.innerText="Congrtulations! You won the game!";
    }
    else {
        status.innerText="Try again. Something is wrong.";
    }
});