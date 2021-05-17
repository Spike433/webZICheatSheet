const http = require('http');
const db = require('./db');
const url = require('url');


async function getAllSubjects(){

    let text= 'select nazpredmet from predmet';
    const { rows } = await db.query(text);

   return  '<ul>'+ rows.map(x=>`<li><a href="subjects?nazpred=${x.nazpredmet}">${x.nazpredmet}</a></li>`).join(' ') + '</ul>';
}

async function showStudentsOnSubject(param){

    let text=`select imestudent,prezimestudent from predmet natural join student where nazpredmet like \'${param}\' `;

    const { rows } = await db.query(text);

    return  '<ul>'+ rows.map(x=>`<li><a href="students?nazpred=${param}&imestudent=${x.imestudent}&prezimestudent=${x.prezimestudent}">${x.imestudent} ${x.prezimestudent} </a></li>`).join(' ') + '</ul>';
}

async function showNotSelectedGrades(subj,name,surn){

    let text=`
    select ocjena,nazpredmet
    from predmet natural join student natural join ispit
    where imestudent=\'${name}\' and prezimestudent=\'${surn}\'
    except
    select ocjena,nazpredmet
    from predmet natural join student natural join ispit
    where nazpredmet=\'${subj}\'
    and imestudent=\'${name}\' and prezimestudent=\'${surn}\' 
    `
    const { rows } = await db.query(text);

    return  '<ul>'+ rows.map(x=>`<li>ocj=${x.ocjena} &nbsp&nbsp&nbsp pred=${x.nazpredmet} </li>`).join(' ') + '</ul>';

}

async function showSubjAndName(subj,name,surn){

    let text=`    
    select ocjena,nazpredmet
    from predmet natural join student natural join ispit
    where nazpredmet=\'${subj}\'
    and imestudent=\'${name}\' and prezimestudent=\'${surn}\' 
    `
    const { rows } = await db.query(text);

    return  '<ul style="background-color:#A4f077; width: 20%">'+ rows.map(x=>`<li>ocj=${x.ocjena} &nbsp&nbsp&nbsp pred=${x.nazpredmet} </li>`).join(' ') + '</ul>';
}

async function getHomePage(selectedSubj,selectedStudentName,selectedStudentSurn){
    let data;
    let data2='';
    let title;

    if(selectedSubj==undefined){
            data= await getAllSubjects();
            title='Lista svih predmeta'

    }else if(selectedStudentName==undefined) {
        title=selectedSubj;
        data=await showStudentsOnSubject(selectedSubj);

    }else{
        title='Ispis ocjena i predmeta "'+selectedSubj + '" i svih ostalih';
        data= await showSubjAndName(selectedSubj,selectedStudentName,selectedStudentSurn);
        data2= await showNotSelectedGrades(selectedSubj,selectedStudentName,selectedStudentSurn)

    }


    return `
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
</head>
<body>
    <h1>${title}</h1>
        ${data}
        ${data2}         
</body>
</html>
    `
}



http.createServer(async function(req, res) {

    const queryObject = url.parse(req.url,true).query;
    //console.log(queryObject.nazpred);

    res.writeHead(200);
    res.end(await getHomePage(queryObject.nazpred,queryObject.imestudent,queryObject.prezimestudent));
}).listen(80);

