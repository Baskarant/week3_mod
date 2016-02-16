fs = require('fs')
fs.readFile('data/datafile.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  // removing the double quotes from the data
  data=data.replace(/"/g, "");
  // splitting the data in to lines
  var lines=data.split("\n");
  // array to store the objects
  var jsonData = [];
  // getting the headers in the header line
  var headerLine=lines[0].split(",");
  // creating a object for each line
  for(var i=1;i<(lines.length)-2;i++){
    var obj = {};
    var currentLine=lines[i].split(",");
    obj[headerLine[0]] = currentLine[0];
    for(var j=1;j<headerLine.length;j++){
      obj[headerLine[j]] = parseFloat(currentLine[j]);
    }
    // pushing the object in array
    jsonData.push(obj);
  }
  // console.log(jsonData);

  var popData = [];
  jsonData.forEach ( function(val){
     var obj1 = {};
    //  console.log(val);
     obj1.country = val['Country Name'];
     obj1.population = val["Population (Millions) - 2013"];
     popData.push(obj1);
    //  write the result file into json
     fs.writeFile("data/2a.json",JSON.stringify(popData),function(err){
        if(err){
          return console.log(err);
        }
     });
    //  console.log(obj);
  });

  var gdpData =[];
  jsonData.forEach(function(val){
    var obj2={};
    obj2.country = val['Country Name'];
    obj2.gdp = val["GDP Billions (US$) - 2013"];
    gdpData.push(obj2);
    // console.log(obj2);
    fs.writeFile("data/2b.json",JSON.stringify(gdpData),function(err){
       if(err){
         return console.log(err);
       }
    });
  });

  var purpowData =[];
  jsonData.forEach(function(val){
    var obj3={};
    obj3.country = val['Country Name'];
    obj3.purpow = val["Purchasing Power in Billions ( Current International Dollar) - 2013"];
    purpowData.push(obj3);
    // console.log(obj3);
    fs.writeFile("data/2c.json",JSON.stringify(purpowData),function(err){
       if(err){
         return console.log(err);
       }
    });
  });

var popGrowthData=[];
jsonData.forEach(function(val){
var temp={};
temp.country = val['Country Name'];
temp.growth1 = val["Population (Millions) - 2011"] - val["Population (Millions) - 2010"];
temp.growth2 = val["Population (Millions) - 2012"] - val["Population (Millions) - 2011"];
temp.growth3 = val["Population (Millions) - 2013"] - val["Population (Millions) - 2012"];
popGrowthData.push(temp);
// console.log(temp);

fs.writeFile("data/3a.json",JSON.stringify(popGrowthData),function(err){
    if(err){
      return console.log(err);
    }
});

});


var purpowGrowthData=[];
jsonData.forEach(function(val){
var temp={};
   temp.country = val['Country Name'];
   temp.growth1 = val["Purchasing Power in Billions ( Current International Dollar) - 2011"] - val["Purchasing Power in Billions ( Current International Dollar) - 2010"];
   temp.growth2 = val["Purchasing Power in Billions ( Current International Dollar) - 2012"] - val["Purchasing Power in Billions ( Current International Dollar) - 2011"];
   temp.growth3 = val["Purchasing Power in Billions ( Current International Dollar) - 2013"] - val["Purchasing Power in Billions ( Current International Dollar) - 2012"];
   purpowGrowthData.push(temp);
// console.log(temp);
      fs.writeFile("data/3b.json",JSON.stringify(purpowGrowthData),function(err){
          if(err){
            return console.log(err);
          }
      });
});
  // console.log(JSON.stringify(popData,null,2));
  // console.log(JSON.stringify(jsonData, null, 2));
  // converting the array in proper JSON Format

  var asia = {};
  var sa ={};
  var na ={};
  var aus ={};
  var eur ={};
  var afr = {};
  var asiaPop=0;
  var asiaGdp = 0;
  var saPop = 0;
  var saGdp = 0;
  var naPop = 0;
  var naGdp =0;
  var ausPop = 0;
  var ausGdp = 0;
  var eurPop = 0;
  var eurGdp = 0;
  var afrPop = 0;
  var afrGdp = 0;
  var countryToContinent ={

      Argentina:"South America",
      Australia:"Australia",
      Brazil : "South America",
      Canada: "North America",
      China:"Asia",
      France:"Europe",
      Germany:"Europe",
      India:"Asia",
      Indonesia:"Asia",
      Italy:"Europe",
      Japan:"Asia",
      Mexico:"North America",
      'Republic of Korea':"Asia",
      Russia:"Europe",
      'Saudi Arabia':"Asia",
      'South Africa':"Africa",
      Turkey:"Asia",
      'United Kingdom':"Europe",
      USA:"North America",
  }

  var contPop ={
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    'North America' : 0,
    'South America':0
  }

  var contGdp ={
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    'North America' : 0,
    'South America':0
  }

 for(var i=0;i<popData.length;i++){
   contPop[countryToContinent[popData[i].country]] += popData[i].population
   contGdp[countryToContinent[popData[i].country]] += gdpData[i].gdp;
 }
 // console.log(contPop);

 var contPopData =[];
 var contGdpData = [];

  afr.continent = "Africa";
  afr.population = contPop['Africa'];
  contPopData.push(afr);
  afr ={};
  afr.continent = "Africa";
  afr.gdp =contGdp['Africa'];
  contGdpData.push(afr);

  asia.continent = "Asia";
  asia.population = contPop['Asia'];
  contPopData.push(asia);
  asia ={};
  asia.continent = "Asia";
  asia.gdp = contGdp["Asia"];
  contGdpData.push(asia);

  aus.continent = "Australia";
  aus.population = contPop['Australia'];
  contPopData.push(aus);
  aus ={};
  aus.continent = "Australia";
  aus.gdp = contGdp['Australia'];
  contGdpData.push(aus);

  eur.continent = "Europe";
  eur.population = contPop['Europe'];
  contPopData.push(eur);
  eur ={};
  eur.continent = "Europe";
  eur.gdp = contGdp['Europe'];
  contGdpData.push(eur);

  na.continent = "North America";
  na.population = contPop['North America'];
  contPopData.push(na);
  na ={};
  na.continent = "North America";
  na.gdp = contGdp['North America'];
  contGdpData.push(na);

  sa.continent = "South America";
  sa.population = contPop['South America'];
  contPopData.push(sa);
  sa ={};
  sa.continent = "South America";
  sa.gdp = contGdp['South America'];
  contGdpData.push(sa);

  // console.log(JSON.stringify(contPopData,null,2));
  // console.log(JSON.stringify(contGdpData,null,2));

  fs.writeFile("data/4a.json",JSON.stringify(contGdpData),function(err){
      if(err){
        return console.log(err);
      }
  });

  fs.writeFile("data/4b.json",JSON.stringify(contPopData),function(err){
      if(err){
        return console.log(err);
      }
  });

});
