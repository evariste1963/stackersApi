//when fetching spot data --
//add/replace the days spot price -- add to end of array
// delete first entry in array

let rawData = [
  [1451606400, 719.2],
  [1451865600, 736.8],
  [1451952000, 735.2],
  [1452038400, 747.1],
  [1452124800, 759.4],
  [1452211200, 757.9],
  [1452470400, 757.5],
  [1452556800, 755.4],
  [1452643200, 753.4],
  [1452729600, 756.2],
  [1452816000, 764.4],
  [1453075200, 763.1],
  [1453161600, 768.0],
  [1453248000, 776.6],
  [1453334400, 775.7],
  [1453420800, 764.7],
  [1453680000, 775.6],
  [1453766400, 777.4],
  [1453852800, 783.0],
  [1453939200, 774.2],
  [1454025600, 783.8],
  [1454284800, 783.8],
  [1454371200, 785.2],
  [1454457600, 775.9],
  [1454544000, 793.1],
  [1454630400, 794.2],
  [1454889600, 830.1],
  [1454976000, 822.2],
  [1455062400, 823.1],
  [1455148800, 859.6],
  [1455235200, 857.5],
  [1455494400, 836.2],
  [1455580800, 845.3],
  [1455667200, 845.1],
  [1455753600, 842.5],
  [1455840000, 862.9],
  [1456099200, 856.8],
  [1456185600, 866.0],
  [1456272000, 897.7],
  [1456358400, 886.3],
  [1456444800, 884.7],
  [1456704000, 886.1],
  [1456790400, 888.2],
  [1456876800, 881.1],
  [1456963200, 883.2],
  [1457049600, 898.7],
  [1457308800, 892.6],
  [1457395200, 891.8],
  [1457481600, 876.4],
  [1457568000, 885.3],
  [1457654400, 878.7],
  [1457913600, 867.6],
  [1458000000, 869.8],
  [1458086400, 871.5],
  [1458172800, 874.1],
  [1458259200, 862.8],
  [1458518400, 864.5],
  [1458604800, 881.0],
  [1458691200, 862.9],
  [1458777600, 863.2],
  [1458864000, 863.2],
  [1459123200, 856.4],
  [1459209600, 859.5],
  [1459296000, 855.7],
  [1459382400, 860.6],
  [1459468800, 855.3],
  [1459728000, 853.5],
  [1459814400, 871.3],
  [1459900800, 867.0],
  [1459987200, 881.2],
  [1460073600, 878.7],
  [1460332800, 879.6],
  [1460419200, 882.9],
  [1460505600, 876.7],
  [1460592000, 872.5],
  [1460678400, 865.5],
  [1460937600, 864.6],
  [1461024000, 871.8],
  [1461110400, 869.3],
  [1461196800, 871.2],
  [1461283200, 862.7],
  [1461542400, 854.4],
  [1461628800, 851.4],
  [1461715200, 858.1],
  [1461801600, 861.8],
  [1461888000, 877.6],
  [1462147200, 876.2],
  [1462233600, 889.5],
  [1462320000, 886.1],
  [1462406400, 883.2],
  [1462492800, 893.2],
  [1462752000, 878.7],
  [1462838400, 872.9],
  [1462924800, 882.8],
  [1463011200, 882.2],
  [1463097600, 882.3],
  [1463356800, 892.8],
  [1463443200, 882.7],
  [1463529600, 870.7],
  [1463616000, 854.4],
  [1463702400, 864.1],
  [1463961600, 861.4],
  [1464048000, 846.6],
  [1464134400, 829.4],
  [1464220800, 833.7],
  [1464307200, 832.1],
  [1464566400, 831.7],
  [1464652800, 832.8],
  [1464739200, 842.7],
  [1464825600, 839.2],
  [1464912000, 854.5],
  [1465171200, 860.0],
  [1465257600, 852.6],
  [1465344000, 867.7],
  [1465430400, 873.5],
  [1465516800, 890.1],
  [1465776000, 897.1],
  [1465862400, 912.0],
  [1465948800, 904.2],
  [1466035200, 931.8],
  [1466121600, 902.9],
  [1466380800, 872.2],
  [1466467200, 867.4],
  [1466553600, 861.2],
  [1466640000, 852.4],
  [1466726400, 965.4],
  [1466985600, 1007.4],
  [1467072000, 983.2],
  [1467158400, 977.1],
  [1467244800, 988.0],
  [1467331200, 1010.2],
  [1467590400, 1016.4],
  [1467676800, 1035.2],
  [1467763200, 1060.6],
  [1467849600, 1049.0],
  [1467936000, 1045.0],
  [1468195200, 1044.7],
  [1468281600, 1018.2],
  [1468368000, 1015.7],
  [1468454400, 993.4],
  [1468540800, 1002.7],
  [1468800000, 1004.8],
  [1468886400, 1013.2],
  [1468972800, 998.6],
  [1469059200, 999.6],
  [1469145600, 1009.4],
  [1469404800, 1000.5],
  [1469491200, 1008.7],
  [1469577600, 1013.4],
  [1469664000, 1022.4],
  [1469750400, 1010.8],
  [1470009600, 1022.2],
  [1470096000, 1024.3],
  [1470182400, 1019.8],
  [1470268800, 1038.3],
  [1470355200, 1026.4],
  [1470614400, 1025.3],
  [1470700800, 1032.2],
  [1470787200, 1035.8],
  [1470873600, 1045.0],
  [1470960000, 1045.5],
  [1471219200, 1040.1],
  [1471305600, 1036.6],
  [1471392000, 1032.3],
  [1471478400, 1025.5],
  [1471564800, 1031.3],
  [1471824000, 1015.9],
  [1471910400, 1017.6],
  [1471996800, 1001.7],
  [1472083200, 1001.6],
  [1472169600, 998.8],
  [1472428800, 1008.6],
  [1472515200, 1006.5],
  [1472601600, 999.7],
  [1472688000, 984.6],
  [1472774400, 995.3],
  [1473033600, 997.6],
  [1473120000, 995.7],
  [1473206400, 1010.5],
  [1473292800, 1008.9],
  [1473379200, 1003.8],
  [1473638400, 995.5],
  [1473724800, 1004.0],
  [1473811200, 1002.7],
  [1473897600, 993.6],
  [1473984000, 1000.2],
  [1474243200, 1006.7],
  [1474329600, 1014.4],
  [1474416000, 1023.2],
  [1474502400, 1022.4],
  [1474588800, 1032.9],
  [1474848000, 1033.3],
  [1474934400, 1022.0],
  [1475020800, 1018.3],
  [1475107200, 1015.6],
  [1475193600, 1018.1],
  [1475452800, 1023.1],
  [1475539200, 1006.2],
  [1475625600, 996.2],
  [1475712000, 991.9],
  [1475798400, 1010.3],
  [1476057600, 1017.7],
  [1476144000, 1025.0],
  [1476230400, 1030.9],
  [1476316800, 1034.4],
  [1476403200, 1026.4],
  [1476662400, 1032.5],
  [1476748800, 1022.6],
  [1476835200, 1032.3],
  [1476921600, 1038.7],
  [1477008000, 1038.1],
  [1477267200, 1036.8],
  [1477353600, 1046.4],
  [1477440000, 1038.3],
  [1477526400, 1040.1],
  [1477612800, 1047.8],
  [1477872000, 1041.9],
  [1477958400, 1054.4],
  [1478044800, 1058.7],
  [1478131200, 1044.6],
  [1478217600, 1038.3],
  [1478476800, 1035.2],
  [1478563200, 1033.8],
  [1478649600, 1029.7],
  [1478736000, 1015.3],
  [1478822400, 982.3],
  [1479081600, 974.3],
  [1479168000, 990.6],
  [1479254400, 989.6],
  [1479340800, 986.5],
  [1479427200, 983.7],
  [1479686400, 973.4],
  [1479772800, 975.7],
  [1479859200, 956.0],
  [1479945600, 951.5],
  [1480032000, 953.9],
  [1480291200, 956.3],
  [1480377600, 948.7],
  [1480464000, 942.9],
  [1480550400, 920.6],
  [1480636800, 927.1],
  [1480896000, 914.8],
  [1480982400, 922.4],
  [1481068800, 933.9],
  [1481155200, 932.8],
  [1481241600, 925.7],
  [1481500800, 912.6],
  [1481587200, 913.4],
  [1481673600, 914.9],
  [1481760000, 908.4],
  [1481846400, 910.2],
  [1482105600, 917.0],
  [1482192000, 911.3],
  [1482278400, 916.2],
  [1482364800, 920.1],
  [1482451200, 923.0],
  [1482710400, 923.0],
  [1482796800, 923.0],
  [1482883200, 927.9],
  [1482969600, 937.2],
  [1483056000, 927.4],
  [1483315200, 927.4],
  [1483401600, 940.3],
  [1483488000, 946.7],
  [1483574400, 947.5],
  [1483660800, 954.5],
  [1483920000, 970.4],
  [1484006400, 976.5],
  [1484092800, 976.8],
  [1484179200, 986.2],
  [1484265600, 977.5],
  [1484524800, 997.1],
  [1484611200, 981.8],
  [1484697600, 984.2],
  [1484784000, 972.1],
  [1484870400, 974.4],
  [1485129600, 971.0],
  [1485216000, 972.4],
  [1485302400, 947.4],
  [1485388800, 945.0],
  [1485475200, 944.2],
  [1485734400, 953.2],
  [1485820800, 964.0],
  [1485907200, 951.8],
  [1485993600, 975.1],
  [1486080000, 971.6],
  [1486339200, 985.7],
  [1486425600, 990.3],
  [1486512000, 990.8],
  [1486598400, 987.5],
  [1486684800, 984.2],
  [1486944000, 977.6],
  [1487030400, 987.6],
  [1487116800, 983.3],
  [1487203200, 992.3],
  [1487289600, 999.0],
  [1487548800, 991.9],
  [1487635200, 989.0],
  [1487721600, 992.7],
  [1487808000, 994.4],
  [1487894400, 1003.5],
  [1488153600, 1008.3],
  [1488240000, 1009.0],
  [1488326400, 1007.2],
  [1488412800, 1008.0],
  [1488499200, 1000.3],
  [1488758400, 1004.4],
  [1488844800, 997.7],
  [1488931200, 993.7],
  [1489017600, 993.0],
  [1489104000, 988.5],
  [1489363200, 984.4],
  [1489449600, 990.0],
  [1489536000, 980.9],
  [1489622400, 993.9],
  [1489708800, 993.9],
  [1489968000, 996.8],
  [1490054400, 994.9],
  [1490140800, 1001.2],
  [1490227200, 996.0],
  [1490313600, 998.8],
  [1490572800, 1000.4],
  [1490659200, 1003.0],
  [1490745600, 1007.9],
  [1490832000, 999.6],
  [1490918400, 995.5],
  [1491177600, 999.5],
  [1491264000, 1010.4],
  [1491350400, 998.5],
  [1491436800, 1002.3],
  [1491523200, 1022.0],
  [1491782400, 1005.9],
  [1491868800, 1003.3],
  [1491955200, 1018.6],
  [1492041600, 1025.8],
  [1492128000, 1025.8],
  [1492387200, 1019.7],
  [1492473600, 1002.0],
  [1492560000, 998.4],
  [1492646400, 998.4],
  [1492732800, 1003.3],
  [1492992000, 993.5],
  [1493078400, 988.5],
  [1493164800, 981.6],
  [1493251200, 979.2],
  [1493337600, 978.9],
  [1493596800, 979.6],
  [1493683200, 971.4],
  [1493769600, 969.4],
  [1493856000, 951.1],
  [1493942400, 947.6],
  [1494201600, 950.3],
  [1494288000, 942.4],
  [1494374400, 944.4],
  [1494460800, 949.9],
  [1494547200, 955.2],
  [1494806400, 954.8],
  [1494892800, 955.4],
  [1494979200, 969.3],
  [1495065600, 966.2],
  [1495152000, 961.3],
  [1495411200, 967.2],
  [1495497600, 970.9],
  [1495584000, 967.3],
  [1495670400, 971.0],
  [1495756800, 989.1],
  [1496016000, 985.1],
  [1496102400, 981.8],
  [1496188800, 980.8],
  [1496275200, 980.4],
  [1496361600, 989.7],
  [1496620800, 989.7],
  [1496707200, 1003.2],
  [1496793600, 996.2],
  [1496880000, 983.2],
  [1496966400, 994.0],
  [1497225600, 999.3],
  [1497312000, 991.3],
  [1497398400, 997.5],
  [1497484800, 983.1],
  [1497571200, 980.6],
  [1497830400, 978.4],
  [1497916800, 984.5],
  [1498003200, 981.1],
  [1498089600, 987.9],
  [1498176000, 985.8],
  [1498435200, 977.5],
  [1498521600, 978.0],
  [1498608000, 964.6],
  [1498694400, 956.8],
  [1498780800, 956.4],
  [1499040000, 950.2],
  [1499126400, 946.7],
  [1499212800, 944.2],
  [1499299200, 946.0],
  [1499385600, 943.8],
  [1499644800, 942.2],
  [1499731200, 943.0],
  [1499817600, 945.7],
  [1499904000, 942.4],
  [1499990400, 940.3],
  [1500249600, 944.3],
  [1500336000, 953.0],
  [1500422400, 952.5],
  [1500508800, 954.0],
  [1500595200, 961.2],
  [1500854400, 962.3],
  [1500940800, 961.3],
  [1501027200, 956.0],
  [1501113600, 963.8],
  [1501200000, 964.2],
  [1501459200, 961.5],
  [1501545600, 960.6],
  [1501632000, 960.1],
  [1501718400, 964.9],
  [1501804800, 964.6],
  [1502064000, 966.0],
  [1502150400, 973.7],
  [1502236800, 978.4],
  [1502323200, 988.8],
  [1502409600, 991.1],
  [1502668800, 987.5],
  [1502755200, 988.3],
  [1502841600, 988.8],
  [1502928000, 997.2],
  [1503014400, 1007.8],
  [1503273600, 1001.8],
  [1503360000, 1000.6],
  [1503446400, 1005.6],
  [1503532800, 1007.2],
  [1503619200, 998.0],
  [1503878400, 994.1],
  [1503964800, 1018.3],
  [1504051200, 1012.7],
  [1504137600, 1018.0],
  [1504224000, 1017.8],
  [1504483200, 1028.9],
  [1504569600, 1025.1],
  [1504656000, 1023.6],
  [1504742400, 1024.8],
  [1504828800, 1021.1],
  [1505088000, 1011.9],
  [1505174400, 999.9],
  [1505260800, 1003.4],
  [1505347200, 992.2],
  [1505433600, 973.1],
  [1505692800, 969.6],
  [1505779200, 968.5],
  [1505865600, 966.7],
  [1505952000, 954.0],
  [1506038400, 957.1],
  [1506297600, 958.9],
  [1506384000, 968.9],
  [1506470400, 958.2],
  [1506556800, 954.5],
  [1506643200, 956.4],
  [1506902400, 959.6],
  [1506988800, 959.7],
  [1507075200, 959.5],
  [1507161600, 970.0],
  [1507248000, 966.3],
  [1507507200, 973.7],
  [1507593600, 977.0],
  [1507680000, 977.5],
  [1507766400, 980.0],
  [1507852800, 976.8],
  [1508112000, 981.5],
  [1508198400, 975.6],
  [1508284800, 972.1],
  [1508371200, 974.3],
  [1508457600, 971.4],
  [1508716800, 966.9],
  [1508803200, 973.1],
  [1508889600, 962.2],
  [1508976000, 967.3],
  [1509062400, 965.9],
  [1509321600, 964.0],
  [1509408000, 956.5],
  [1509494400, 963.4],
  [1509580800, 979.0],
  [1509667200, 969.7],
  [1509926400, 968.5],
  [1510012800, 970.8],
  [1510099200, 980.1],
  [1510185600, 979.4],
  [1510272000, 971.5],
  [1510531200, 974.7],
  [1510617600, 971.7],
  [1510704000, 974.1],
  [1510790400, 970.1],
  [1510876800, 972.8],
  [1511136000, 969.8],
  [1511222400, 970.1],
  [1511308800, 968.8],
  [1511395200, 970.4],
  [1511481600, 966.3],
  [1511740800, 970.8],
  [1511827200, 976.5],
  [1511913600, 957.4],
  [1512000000, 945.7],
  [1512086400, 945.5],
  [1512345600, 944.8],
  [1512432000, 941.0],
  [1512518400, 944.2],
  [1512604800, 935.4],
  [1512691200, 935.0],
  [1512950400, 933.6],
  [1513036800, 931.5],
  [1513123200, 930.0],
  [1513209600, 931.9],
  [1513296000, 942.1],
  [1513555200, 940.9],
  [1513641600, 944.1],
  [1513728000, 943.3],
  [1513814400, 946.9],
  [1513900800, 946.1],
  [1514160000, 946.1],
  [1514246400, 946.1],
  [1514332800, 954.8],
  [1514419200, 960.7],
  [1514505600, 954.4],
  [1514764800, 954.4],
  [1514851200, 966.2],
  [1514937600, 973.1],
  [1515024000, 970.0],
  [1515110400, 971.1],
  [1515369600, 972.0],
  [1515456000, 969.5],
  [1515542400, 975.3],
  [1515628800, 977.5],
  [1515715200, 969.4],
  [1515974400, 970.3],
  [1516060800, 968.4],
  [1516147200, 965.5],
  [1516233600, 959.5],
  [1516320000, 964.1],
  [1516579200, 954.1],
  [1516665600, 951.2],
  [1516752000, 951.8],
  [1516838400, 947.4],
  [1516924800, 954.1],
  [1517184000, 955.6],
  [1517270400, 952.7],
  [1517356800, 945.9],
  [1517443200, 942.2],
  [1517529600, 942.5],
  [1517788800, 951.3],
  [1517875200, 957.3],
  [1517961600, 954.2],
  [1518048000, 939.7],
  [1518134400, 951.8],
  [1518393600, 957.6],
  [1518480000, 954.9],
  [1518566400, 956.9],
  [1518652800, 962.1],
  [1518739200, 963.0],
  [1518998400, 962.3],
  [1519084800, 956.7],
  [1519171200, 951.8],
  [1519257600, 952.9],
  [1519344000, 950.4],
  [1519603200, 956.8],
  [1519689600, 955.1],
  [1519776000, 956.5],
  [1519862400, 953.0],
  [1519948800, 960.2],
  [1520208000, 953.6],
  [1520294400, 959.0],
  [1520380800, 956.8],
  [1520467200, 955.2],
  [1520553600, 952.3],
  [1520812800, 949.2],
  [1520899200, 945.7],
  [1520985600, 949.1],
  [1521072000, 945.5],
  [1521158400, 941.2],
  [1521417600, 935.4],
  [1521504000, 935.5],
  [1521590400, 939.5],
  [1521676800, 943.0],
  [1521763200, 951.7],
  [1522022400, 950.7],
  [1522108800, 948.6],
  [1522195200, 944.9],
  [1522281600, 943.7],
  [1522368000, 943.7],
  [1522627200, 942.0],
  [1522713600, 949.4],
  [1522800000, 949.5],
  [1522886400, 948.6],
  [1522972800, 945.1],
  [1523232000, 942.9],
  [1523318400, 944.7],
  [1523404800, 950.8],
  [1523491200, 942.5],
  [1523577600, 943.1],
  [1523836800, 941.6],
  [1523923200, 938.1],
  [1524009600, 949.4],
  [1524096000, 948.2],
  [1524182400, 953.3],
  [1524441600, 949.4],
  [1524528000, 951.6],
  [1524614400, 948.4],
  [1524700800, 947.9],
  [1524787200, 957.9],
  [1525046400, 953.4],
  [1525132800, 961.5],
  [1525219200, 959.0],
  [1525305600, 971.1],
  [1525392000, 968.7],
  [1525651200, 965.0],
  [1525737600, 966.5],
  [1525824000, 967.6],
  [1525910400, 979.1],
  [1525996800, 977.2],
  [1526256000, 970.8],
  [1526342400, 959.5],
  [1526428800, 957.6],
  [1526515200, 954.9],
  [1526601600, 956.1],
  [1526860800, 961.0],
  [1526947200, 963.5],
  [1527033600, 966.2],
  [1527120000, 975.7],
  [1527206400, 979.1],
  [1527465600, 980.2],
  [1527552000, 976.2],
  [1527638400, 979.9],
  [1527724800, 981.0],
  [1527811200, 971.3],
  [1528070400, 971.7],
  [1528156800, 968.4],
  [1528243200, 968.2],
  [1528329600, 966.8],
  [1528416000, 968.7],
  [1528675200, 970.4],
  [1528761600, 972.6],
  [1528848000, 969.7],
  [1528934400, 977.1],
  [1529020800, 967.3],
  [1529280000, 967.8],
  [1529366400, 969.0],
  [1529452800, 967.1],
  [1529539200, 955.0],
  [1529625600, 956.3],
  [1529884800, 956.3],
  [1529971200, 952.4],
  [1530057600, 954.3],
  [1530144000, 955.9],
  [1530230400, 947.1],
  [1530489600, 950.7],
  [1530576000, 950.1],
  [1530662400, 950.5],
  [1530748800, 949.4],
  [1530835200, 945.7],
  [1531094400, 951.8],
  [1531180800, 945.3],
  [1531267200, 944.6],
  [1531353600, 942.2],
  [1531440000, 940.6],
  [1531699200, 938.1],
  [1531785600, 936.8],
  [1531872000, 938.4],
  [1531958400, 936.4],
  [1532044800, 937.9],
  [1532304000, 934.1],
  [1532390400, 933.9],
  [1532476800, 936.5],
  [1532563200, 934.0],
  [1532649600, 932.5],
  [1532908800, 930.9],
  [1532995200, 930.8],
  [1533081600, 928.9],
  [1533168000, 932.7],
  [1533254400, 934.3],
  [1533513600, 934.9],
  [1533600000, 935.9],
  [1533686400, 938.9],
  [1533772800, 943.7],
  [1533859200, 950.6],
  [1534118400, 939.5],
  [1534204800, 938.7],
  [1534291200, 933.0],
  [1534377600, 927.6],
  [1534464000, 925.0],
  [1534723200, 928.2],
  [1534809600, 925.7],
  [1534896000, 927.0],
  [1534982400, 929.0],
  [1535068800, 931.5],
  [1535328000, 929.2],
  [1535414400, 941.2],
  [1535500800, 926.7],
  [1535587200, 920.6],
  [1535673600, 925.1],
  [1535932800, 931.4],
  [1536019200, 928.1],
  [1536105600, 923.6],
  [1536192000, 930.7],
  [1536278400, 925.7],
  [1536537600, 919.0],
  [1536624000, 915.2],
  [1536710400, 918.1],
  [1536796800, 923.9],
  [1536883200, 919.3],
  [1537142400, 913.8],
  [1537228800, 912.5],
  [1537315200, 914.9],
  [1537401600, 911.8],
  [1537488000, 915.2],
  [1537747200, 915.3],
  [1537833600, 913.1],
  [1537920000, 905.9],
  [1538006400, 903.8],
  [1538092800, 910.4],
  [1538352000, 911.8],
  [1538438400, 928.0],
  [1538524800, 923.6],
  [1538611200, 923.7],
  [1538697600, 920.6],
  [1538956800, 908.3],
  [1539043200, 905.6],
  [1539129600, 900.5],
  [1539216000, 912.5],
  [1539302400, 927.1],
  [1539561600, 936.0],
  [1539648000, 931.6],
  [1539734400, 935.8],
  [1539820800, 935.4],
  [1539907200, 941.3],
  [1540166400, 942.2],
  [1540252800, 952.8],
  [1540339200, 953.0],
  [1540425600, 960.5],
  [1540512000, 962.4],
  [1540771200, 961.1],
  [1540857600, 962.5],
  [1540944000, 950.9],
  [1541030400, 949.0],
  [1541116800, 950.5],
  [1541376000, 946.4],
  [1541462400, 941.6],
  [1541548800, 936.4],
  [1541635200, 932.5],
  [1541721600, 929.8],
  [1541980800, 937.0],
  [1542067200, 925.0],
  [1542153600, 925.3],
  [1542240000, 947.8],
  [1542326400, 952.2],
  [1542585600, 949.8],
  [1542672000, 953.7],
  [1542758400, 959.5],
  [1542844800, 953.0],
  [1542931200, 955.6],
  [1543190400, 953.9],
  [1543276800, 958.6],
  [1543363200, 951.4],
  [1543449600, 959.7],
  [1543536000, 954.3],
  [1543795200, 966.0],
  [1543881600, 974.5],
  [1543968000, 970.4],
  [1544054400, 972.2],
  [1544140800, 974.5],
  [1544400000, 993.9],
  [1544486400, 994.3],
  [1544572800, 983.9],
  [1544659200, 984.9],
  [1544745600, 983.6],
  [1545004800, 984.6],
  [1545091200, 986.7],
  [1545177600, 992.6],
  [1545264000, 997.0],
  [1545350400, 992.7],
  [1545609600, 989.3],
  [1545696000, 989.3],
  [1545782400, 992.8],
  [1545868800, 1003.6],
  [1545955200, 1008.3],
  [1546214400, 1004.2],
  [1546300800, 1004.2],
  [1546387200, 1018.0],
  [1546473600, 1024.1],
  [1546560000, 1006.2],
  [1546819200, 1012.1],
  [1546905600, 1010.4],
  [1546992000, 1011.3],
  [1547078400, 1011.1],
  [1547164800, 1005.2],
  [1547424000, 1001.2],
  [1547510400, 1010.7],
  [1547596800, 1004.9],
  [1547683200, 999.9],
  [1547769600, 995.0],
  [1548028800, 992.4],
  [1548115200, 989.4],
  [1548201600, 979.8],
  [1548288000, 984.1],
  [1548374400, 982.5],
  [1548633600, 989.8],
  [1548720000, 994.6],
  [1548806400, 1002.8],
  [1548892800, 1005.9],
  [1548979200, 1007.2],
  [1549238400, 1002.9],
  [1549324800, 1015.6],
  [1549411200, 1012.3],
  [1549497600, 1009.8],
  [1549584000, 1015.8],
  [1549843200, 1015.5],
  [1549929600, 1016.8],
  [1550016000, 1019.1],
  [1550102400, 1026.1],
  [1550188800, 1024.8],
  [1550448000, 1025.3],
  [1550534400, 1023.8],
  [1550620800, 1028.6],
  [1550707200, 1018.8],
  [1550793600, 1017.9],
  [1551052800, 1018.7],
  [1551139200, 1000.9],
  [1551225600, 991.9],
  [1551312000, 991.8],
  [1551398400, 990.6],
  [1551657600, 975.9],
  [1551744000, 979.1],
  [1551830400, 977.7],
  [1551916800, 979.8],
  [1552003200, 996.2],
  [1552262400, 987.1],
  [1552348800, 990.5],
  [1552435200, 988.1],
  [1552521600, 975.3],
  [1552608000, 981.8],
  [1552867200, 987.6],
  [1552953600, 986.0],
  [1553040000, 988.5],
  [1553126400, 1001.8],
  [1553212800, 991.9],
  [1553472000, 999.6],
  [1553558400, 996.2],
  [1553644800, 992.9],
  [1553731200, 989.7],
  [1553817600, 994.1],
  [1554076800, 984.0],
  [1554163200, 990.2],
  [1554249600, 980.7],
  [1554336000, 981.0],
  [1554422400, 990.3],
  [1554681600, 996.3],
  [1554768000, 998.7],
  [1554854400, 997.4],
  [1554940800, 992.6],
  [1555027200, 987.9],
  [1555286400, 980.3],
  [1555372800, 977.8],
  [1555459200, 977.7],
  [1555545600, 980.6],
  [1555632000, 980.6],
  [1555891200, 983.0],
  [1555977600, 981.2],
  [1556064000, 981.6],
  [1556150400, 992.3],
  [1556236800, 992.8],
  [1556496000, 990.1],
  [1556582400, 983.6],
  [1556668800, 981.3],
  [1556755200, 975.0],
  [1556841600, 974.6],
  [1557100800, 976.6],
  [1557187200, 981.8],
  [1557273600, 988.8],
  [1557360000, 987.8],
  [1557446400, 987.6],
  [1557705600, 997.7],
  [1557792000, 1005.2],
  [1557878400, 1009.8],
  [1557964800, 1009.8],
  [1558051200, 1005.8],
  [1558310400, 1002.6],
  [1558396800, 994.3],
  [1558483200, 1006.2],
  [1558569600, 1013.2],
  [1558656000, 1010.5],
  [1558915200, 1011.5],
  [1559001600, 1008.6],
  [1559088000, 1014.7],
  [1559174400, 1017.3],
  [1559260800, 1027.9],
  [1559520000, 1042.8],
  [1559606400, 1044.9],
  [1559692800, 1048.7],
  [1559779200, 1050.5],
  [1559865600, 1050.9],
  [1560124800, 1047.0],
  [1560211200, 1041.2],
  [1560297600, 1047.1],
  [1560384000, 1053.2],
  [1560470400, 1071.7],
  [1560729600, 1068.2],
  [1560816000, 1069.5],
  [1560902400, 1064.1],
  [1560988800, 1086.2],
  [1561075200, 1100.5],
  [1561334400, 1104.7],
  [1561420800, 1125.2],
  [1561507200, 1107.4],
  [1561593600, 1106.4],
  [1561680000, 1107.1],
  [1561939200, 1098.8],
  [1562025600, 1104.6],
  [1562112000, 1125.1],
  [1562198400, 1125.3],
  [1562284800, 1110.2],
  [1562544000, 1118.8],
  [1562630400, 1116.3],
  [1562716800, 1127.1],
  [1562803200, 1127.6],
  [1562889600, 1120.6],
  [1563148800, 1128.8],
  [1563235200, 1135.3],
  [1563321600, 1134.6],
  [1563408000, 1135.4],
  [1563494400, 1151.4],
  [1563753600, 1142.5],
  [1563840000, 1146.2],
  [1563926400, 1141.6],
  [1564012800, 1133.3],
  [1564099200, 1146.7],
  [1564358400, 1160.4],
  [1564444800, 1173.3],
  [1564531200, 1165.9],
  [1564617600, 1157.9],
  [1564704000, 1189.7],
  [1564963200, 1207.0],
  [1565049600, 1204.1],
  [1565136000, 1239.2],
  [1565222400, 1232.7],
  [1565308800, 1239.9],
  [1565568000, 1245.2],
  [1565654400, 1241.3],
  [1565740800, 1253.7],
  [1565827200, 1251.3],
  [1565913600, 1247.8],
  [1566172800, 1233.3],
  [1566259200, 1240.2],
  [1566345600, 1239.2],
  [1566432000, 1226.0],
  [1566518400, 1225.1],
  [1566777600, 1230.4],
  [1566864000, 1248.8],
  [1566950400, 1257.9],
  [1567036800, 1262.1],
  [1567123200, 1255.0],
  [1567382400, 1265.0],
  [1567468800, 1271.6],
  [1567555200, 1268.0],
  [1567641600, 1240.7],
  [1567728000, 1237.4],
  [1567987200, 1222.7],
  [1568073600, 1212.8],
  [1568160000, 1207.5],
  [1568246400, 1228.7],
  [1568332800, 1206.4],
  [1568592000, 1205.5],
  [1568678400, 1203.3],
  [1568764800, 1204.4],
  [1568851200, 1201.6],
  [1568937600, 1201.2],
  [1569196800, 1224.6],
  [1569283200, 1218.8],
  [1569369600, 1235.0],
  [1569456000, 1221.2],
  [1569542400, 1210.1],
  [1569801600, 1205.3],
  [1569888000, 1205.5],
  [1569974400, 1213.1],
  [1570060800, 1223.0],
  [1570147200, 1219.3],
  [1570406400, 1218.5],
  [1570492800, 1232.8],
  [1570579200, 1233.8],
  [1570665600, 1217.0],
  [1570752000, 1166.1],
  [1571011200, 1184.7],
  [1571097600, 1164.4],
  [1571184000, 1159.8],
  [1571270400, 1162.4],
  [1571356800, 1155.0],
  [1571616000, 1148.8],
  [1571702400, 1150.8],
  [1571788800, 1160.1],
  [1571875200, 1164.8],
  [1571961600, 1179.1],
  [1572220800, 1160.8],
  [1572307200, 1152.5],
  [1572393600, 1159.3],
  [1572480000, 1167.7],
  [1572566400, 1165.2],
  [1572825600, 1168.4],
  [1572912000, 1157.1],
  [1572998400, 1154.3],
  [1573084800, 1157.7],
  [1573171200, 1144.4],
  [1573430400, 1133.1],
  [1573516800, 1131.0],
  [1573603200, 1139.4],
  [1573689600, 1140.7],
  [1573776000, 1136.8],
  [1574035200, 1132.0],
  [1574121600, 1135.7],
  [1574208000, 1139.8],
  [1574294400, 1135.2],
  [1574380800, 1141.4],
  [1574640000, 1129.9],
  [1574726400, 1132.9],
  [1574812800, 1129.4],
  [1574899200, 1127.4],
  [1574985600, 1128.8],
  [1575244800, 1130.8],
  [1575331200, 1137.0],
  [1575417600, 1125.3],
  [1575504000, 1122.0],
  [1575590400, 1113.7],
  [1575849600, 1111.1],
  [1575936000, 1112.4],
  [1576022400, 1113.2],
  [1576108800, 1118.8],
  [1576195200, 1099.0],
  [1576454400, 1108.3],
  [1576540800, 1123.6],
  [1576627200, 1127.7],
  [1576713600, 1133.4],
  [1576800000, 1133.5],
  [1577059200, 1146.7],
  [1577145600, 1143.3],
  [1577232000, 1143.3],
  [1577318400, 1140.1],
  [1577404800, 1154.7],
  [1577664000, 1155.1],
  [1577750400, 1143.4],
  [1577836800, 1143.4],
  [1577923200, 1158.0],
  [1578009600, 1184.9],
  [1578268800, 1195.4],
  [1578355200, 1195.0],
  [1578441600, 1200.1],
  [1578528000, 1188.5],
  [1578614400, 1189.5],
  [1578873600, 1194.3],
  [1578960000, 1187.7],
  [1579046400, 1189.3],
  [1579132800, 1189.8],
  [1579219200, 1195.3],
  [1579478400, 1200.4],
  [1579564800, 1187.8],
  [1579651200, 1184.8],
  [1579737600, 1191.3],
  [1579824000, 1197.1],
  [1580083200, 1210.3],
  [1580169600, 1212.5],
  [1580256000, 1210.2],
  [1580342400, 1204.6],
  [1580428800, 1201.8],
  [1580688000, 1210.1],
  [1580774400, 1196.5],
  [1580860800, 1196.5],
  [1580947200, 1209.1],
  [1581033600, 1215.5],
  [1581292800, 1217.3],
  [1581379200, 1213.3],
  [1581465600, 1205.1],
  [1581552000, 1206.6],
  [1581638400, 1215.1],
  [1581897600, 1215.4],
  [1581984000, 1219.4],
  [1582070400, 1238.6],
  [1582156800, 1257.0],
  [1582243200, 1268.1],
  [1582502400, 1293.4],
  [1582588800, 1267.9],
  [1582675200, 1265.8],
  [1582761600, 1283.3],
  [1582848000, 1260.4],
  [1583107200, 1255.0],
  [1583193600, 1260.4],
  [1583280000, 1280.9],
  [1583366400, 1284.3],
  [1583452800, 1291.8],
  [1583712000, 1276.4],
  [1583798400, 1279.7],
  [1583884800, 1283.5],
  [1583971200, 1252.4],
  [1584057600, 1260.2],
  [1584316800, 1211.8],
  [1584403200, 1279.0],
  [1584489600, 1273.6],
  [1584576000, 1264.3],
  [1584662400, 1272.5],
  [1584921600, 1327.5],
  [1585008000, 1362.9],
  [1585094400, 1365.2],
  [1585180800, 1347.1],
  [1585267200, 1309.1],
  [1585526400, 1303.8],
  [1585612800, 1297.6],
  [1585699200, 1268.9],
  [1585785600, 1306.1],
  [1585872000, 1315.9],
  [1586131200, 1345.0],
  [1586217600, 1340.3],
  [1586304000, 1330.8],
  [1586390400, 1347.9],
  [1586476800, 1347.9],
  [1586736000, 1344.1],
  [1586822400, 1382.7],
  [1586908800, 1375.2],
  [1586995200, 1389.6],
  [1587081600, 1353.6],
  [1587340800, 1351.8],
  [1587427200, 1370.4],
  [1587513600, 1387.6],
  [1587600000, 1401.7],
  [1587686400, 1390.8],
  [1587945600, 1382.0],
  [1588032000, 1360.1],
  [1588118400, 1369.6],
  [1588204800, 1349.9],
  [1588291200, 1344.4],
  [1588550400, 1376.0],
  [1588636800, 1364.6],
  [1588723200, 1368.3],
  [1588809600, 1387.0],
  [1588896000, 1368.4],
  [1589155200, 1378.1],
  [1589241600, 1380.6],
  [1589328000, 1397.4],
  [1589414400, 1419.4],
  [1589500800, 1431.2],
  [1589760000, 1422.8],
  [1589846400, 1418.7],
  [1589932800, 1424.9],
  [1590019200, 1412.1],
  [1590105600, 1422.2],
  [1590364800, 1421.4],
  [1590451200, 1392.0],
  [1590537600, 1387.5],
  [1590624000, 1394.0],
  [1590710400, 1398.3],
  [1590969600, 1386.4],
  [1591056000, 1387.4],
  [1591142400, 1353.8],
  [1591228800, 1348.4],
  [1591315200, 1322.9],
  [1591574400, 1331.2],
  [1591660800, 1346.8],
  [1591747200, 1350.1],
  [1591833600, 1374.9],
  [1591920000, 1382.4],
  [1592179200, 1361.1],
  [1592265600, 1368.5],
  [1592352000, 1375.1],
  [1592438400, 1384.8],
  [1592524800, 1403.1],
  [1592784000, 1415.5],
  [1592870400, 1412.4],
  [1592956800, 1418.6],
  [1593043200, 1416.0],
  [1593129600, 1418.8],
  [1593388800, 1444.1],
  [1593475200, 1431.0],
  [1593561600, 1421.6],
  [1593648000, 1425.8],
  [1593734400, 1422.0],
  [1593993600, 1429.2],
  [1594080000, 1423.1],
  [1594166400, 1438.1],
  [1594252800, 1436.4],
  [1594339200, 1424.1],
  [1594598400, 1432.5],
  [1594684800, 1438.2],
  [1594771200, 1429.7],
  [1594857600, 1434.6],
  [1594944000, 1441.8],
  [1595203200, 1435.6],
  [1595289600, 1445.1],
  [1595376000, 1455.0],
  [1595462400, 1473.8],
  [1595548800, 1487.4],
  [1595808000, 1501.7],
  [1595894400, 1499.4],
  [1595980800, 1504.9],
  [1596067200, 1501.2],
  [1596153600, 1497.1],
  [1596412800, 1503.0],
  [1596499200, 1516.3],
  [1596585600, 1558.4],
  [1596672000, 1572.8],
  [1596758400, 1556.3],
  [1597017600, 1562.0],
  [1597104000, 1482.4],
  [1597190400, 1479.9],
  [1597276800, 1484.8],
  [1597363200, 1483.5],
  [1597622400, 1506.1],
  [1597708800, 1519.7],
  [1597795200, 1502.6],
  [1597881600, 1466.7],
  [1597968000, 1472.1],
  [1598227200, 1487.5],
  [1598313600, 1457.0],
  [1598400000, 1465.2],
  [1598486400, 1458.6],
  [1598572800, 1468.3],
  [1598832000, 1461.9],
  [1598918400, 1466.7],
  [1599004800, 1463.6],
  [1599091200, 1462.0],
  [1599177600, 1458.4],
  [1599436800, 1463.3],
  [1599523200, 1467.1],
  [1599609600, 1497.9],
  [1599696000, 1528.4],
  [1599782400, 1523.4],
  [1600041600, 1520.5],
  [1600128000, 1516.7],
  [1600214400, 1508.8],
  [1600300800, 1495.3],
  [1600387200, 1505.2],
  [1600646400, 1492.2],
  [1600732800, 1498.0],
  [1600819200, 1467.8],
  [1600905600, 1464.2],
  [1600992000, 1463.8],
  [1601251200, 1451.8],
  [1601337600, 1467.2],
  [1601424000, 1459.6],
  [1601510400, 1478.2],
  [1601596800, 1471.3],
  [1601856000, 1471.4],
  [1601942400, 1475.0],
  [1602028800, 1461.0],
  [1602115200, 1459.9],
  [1602201600, 1479.7],
  [1602460800, 1473.6],
  [1602547200, 1456.4],
  [1602633600, 1464.8],
  [1602720000, 1465.6],
  [1602806400, 1473.5],
  [1603065600, 1466.0],
  [1603152000, 1464.5],
  [1603238400, 1461.8],
  [1603324800, 1451.8],
  [1603411200, 1459.5],
  [1603670400, 1457.8],
  [1603756800, 1458.7],
  [1603843200, 1438.9],
  [1603929600, 1451.0],
  [1604016000, 1455.4],
  [1604275200, 1463.9],
  [1604361600, 1460.1],
  [1604448000, 1462.9],
  [1604534400, 1478.5],
  [1604620800, 1476.5],
  [1604880000, 1420.2],
  [1604966400, 1418.1],
  [1605052800, 1410.2],
  [1605139200, 1427.8],
  [1605225600, 1436.7],
  [1605484800, 1431.0],
  [1605571200, 1424.7],
  [1605657600, 1410.3],
  [1605744000, 1404.6],
  [1605830400, 1411.7],
  [1606089600, 1384.1],
  [1606176000, 1347.3],
  [1606262400, 1352.8],
  [1606348800, 1355.9],
  [1606435200, 1333.3],
  [1606694400, 1320.2],
  [1606780800, 1355.1],
  [1606867200, 1367.8],
  [1606953600, 1357.5],
  [1607040000, 1367.9],
  [1607299200, 1396.7],
  [1607385600, 1398.2],
  [1607472000, 1375.0],
  [1607558400, 1389.7],
  [1607644800, 1394.3],
  [1607904000, 1375.1],
  [1607990400, 1381.1],
  [1608076800, 1372.1],
  [1608163200, 1391.0],
  [1608249600, 1394.1],
  [1608508800, 1411.5],
  [1608595200, 1409.6],
  [1608681600, 1386.7],
  [1608768000, 1385.1],
  [1608854400, 1385.1],
  [1609113600, 1394.6],
  [1609200000, 1389.3],
  [1609286400, 1387.0],
  [1609372800, 1380.9],
  [1609459200, 1380.9],
  [1609718400, 1431.0],
  [1609804800, 1427.3],
  [1609891200, 1425.7],
  [1609977600, 1417.8],
  [1610064000, 1370.5],
  [1610323200, 1369.5],
  [1610409600, 1351.6],
  [1610496000, 1363.0],
  [1610582400, 1346.4],
  [1610668800, 1354.1],
  [1610928000, 1350.3],
  [1611014400, 1347.5],
  [1611100800, 1362.0],
  [1611187200, 1356.6],
  [1611273600, 1355.2],
  [1611532800, 1358.2],
  [1611619200, 1351.0],
  [1611705600, 1345.0],
  [1611792000, 1351.1],
  [1611878400, 1357.3],
  [1612137600, 1363.6],
  [1612224000, 1345.1],
  [1612310400, 1345.1],
  [1612396800, 1307.7],
  [1612483200, 1313.6],
  [1612742400, 1335.5],
  [1612828800, 1333.4],
  [1612915200, 1330.9],
  [1613001600, 1331.5],
  [1613088000, 1311.6],
  [1613347200, 1306.3],
  [1613433600, 1288.2],
  [1613520000, 1285.3],
  [1613606400, 1271.3],
  [1613692800, 1274.6],
  [1613952000, 1286.4],
  [1614038400, 1275.9],
  [1614124800, 1268.3],
  [1614211200, 1259.3],
  [1614297600, 1246.6],
  [1614556800, 1244.2],
  [1614643200, 1235.8],
  [1614729600, 1224.6],
  [1614816000, 1223.7],
  [1614902400, 1227.4],
  [1615161600, 1221.4],
  [1615248000, 1235.9],
  [1615334400, 1234.3],
  [1615420800, 1234.3],
  [1615507200, 1226.9],
  [1615766400, 1243.4],
  [1615852800, 1248.8],
  [1615939200, 1245.6],
  [1616025600, 1238.4],
  [1616112000, 1250.9],
  [1616371200, 1253.2],
  [1616457600, 1251.6],
  [1616544000, 1261.2],
  [1616630400, 1266.1],
  [1616716800, 1255.7],
  [1616976000, 1238.8],
  [1617062400, 1228.1],
  [1617148800, 1225.7],
  [1617235200, 1248.9],
  [1617321600, 1248.9],
  [1617580800, 1242.3],
  [1617667200, 1258.6],
  [1617753600, 1260.6],
  [1617840000, 1278.6],
  [1617926400, 1268.2],
  [1618185600, 1260.7],
  [1618272000, 1273.1],
  [1618358400, 1259.5],
  [1618444800, 1274.0],
  [1618531200, 1284.0],
  [1618790400, 1268.7],
  [1618876800, 1274.4],
  [1618963200, 1290.9],
  [1619049600, 1291.2],
  [1619136000, 1287.5],
  [1619395200, 1276.5],
  [1619481600, 1282.2],
  [1619568000, 1274.4],
  [1619654400, 1263.9],
  [1619740800, 1276.7],
  [1620000000, 1269.2],
  [1620086400, 1294.8],
  [1620172800, 1281.3],
  [1620259200, 1305.4],
  [1620345600, 1313.8],
  [1620604800, 1301.6],
  [1620691200, 1293.2],
  [1620777600, 1298.7],
  [1620864000, 1297.1],
  [1620950400, 1304.7],
  [1621209600, 1312.9],
  [1621296000, 1313.6],
  [1621382400, 1335.0],
  [1621468800, 1326.7],
  [1621555200, 1324.7],
  [1621814400, 1327.9],
  [1621900800, 1335.2],
  [1621987200, 1345.1],
  [1622073600, 1332.8],
  [1622160000, 1340.0],
  [1622419200, 1336.6],
  [1622505600, 1340.3],
  [1622592000, 1343.3],
  [1622678400, 1322.7],
  [1622764800, 1334.0],
  [1623024000, 1332.9],
  [1623110400, 1337.9],
  [1623196800, 1341.3],
  [1623283200, 1335.4],
  [1623369600, 1331.8],
  [1623628800, 1321.3],
  [1623715200, 1323.9],
  [1623801600, 1319.4],
  [1623888000, 1275.0],
  [1623974400, 1284.3],
  [1624233600, 1276.7],
  [1624320000, 1275.5],
  [1624406400, 1282.6],
  [1624492800, 1284.5],
  [1624579200, 1284.1],
  [1624838400, 1281.9],
  [1624924800, 1269.0],
  [1625011200, 1276.3],
  [1625097600, 1292.8],
  [1625184000, 1295.9],
  [1625443200, 1294.2],
  [1625529600, 1310.6],
  [1625616000, 1309.9],
  [1625702400, 1313.6],
  [1625788800, 1305.5],
  [1626048000, 1290.0],
  [1626134400, 1310.1],
  [1626220800, 1314.9],
  [1626307200, 1315.4],
  [1626393600, 1322.8],
  [1626652800, 1327.7],
  [1626739200, 1339.4],
  [1626825600, 1317.9],
  [1626912000, 1308.0],
  [1626998400, 1308.7],
  [1627257600, 1302.4],
  [1627344000, 1296.9],
  [1627430400, 1295.4],
  [1627516800, 1308.9],
  [1627603200, 1313.2],
  [1627862400, 1303.4],
  [1627948800, 1304.6],
  [1628035200, 1315.0],
  [1628121600, 1292.4],
  [1628208000, 1271.4],
  [1628467200, 1255.7],
  [1628553600, 1244.5],
  [1628640000, 1257.3],
  [1628726400, 1263.1],
  [1628812800, 1280.4],
  [1629072000, 1288.8],
  [1629158400, 1302.6],
  [1629244800, 1296.4],
  [1629331200, 1304.5],
  [1629417600, 1306.7],
  [1629676800, 1313.5],
  [1629763200, 1317.2],
  [1629849600, 1302.6],
  [1629936000, 1302.6],
  [1630022400, 1308.6],
  [1630281600, 1307.3],
  [1630368000, 1318.7],
  [1630454400, 1314.2],
  [1630540800, 1310.2],
  [1630627200, 1314.7],
  [1630886400, 1317.5],
  [1630972800, 1307.3],
  [1631059200, 1300.1],
  [1631145600, 1291.6],
  [1631232000, 1295.2],
  [1631491200, 1295.3],
  [1631577600, 1294.2],
  [1631664000, 1299.4],
  [1631750400, 1269.4],
  [1631836800, 1277.3],
  [1632096000, 1285.8],
  [1632182400, 1300.6],
  [1632268800, 1299.6],
  [1632355200, 1273.2],
  [1632441600, 1277.3],
  [1632700800, 1280.8],
  [1632787200, 1280.9],
  [1632873600, 1294.0],
  [1632960000, 1292.5],
  [1633046400, 1297.8],
  [1633305600, 1289.8],
  [1633392000, 1286.9],
  [1633478400, 1297.0],
  [1633564800, 1293.5],
  [1633651200, 1300.3],
  [1633910400, 1289.9],
  [1633996800, 1299.6],
  [1634083200, 1309.8],
  [1634169600, 1314.7],
  [1634256000, 1287.5],
  [1634515200, 1288.5],
  [1634601600, 1289.7],
  [1634688000, 1287.0],
  [1634774400, 1287.4],
  [1634860800, 1312.9],
  [1635120000, 1311.1],
  [1635206400, 1294.7],
  [1635292800, 1309.2],
  [1635379200, 1307.0],
  [1635465600, 1290.6],
  [1635724800, 1311.6],
  [1635811200, 1315.4],
  [1635897600, 1291.0],
  [1635984000, 1331.2],
  [1636070400, 1335.7],
  [1636329600, 1343.7],
  [1636416000, 1348.4],
  [1636502400, 1380.0],
  [1636588800, 1387.6],
  [1636675200, 1389.0],
  [1636934400, 1384.7],
  [1637020800, 1385.3],
  [1637107200, 1385.1],
  [1637193600, 1380.3],
  [1637280000, 1382.8],
  [1637539200, 1355.3],
  [1637625600, 1338.3],
  [1637712000, 1336.9],
  [1637798400, 1342.5],
  [1637884800, 1350.3],
  [1638144000, 1343.2],
  [1638230400, 1363.9],
  [1638316800, 1343.5],
  [1638403200, 1326.3],
  [1638489600, 1337.0],
  [1638748800, 1343.8],
  [1638835200, 1345.9],
  [1638921600, 1349.7],
  [1639008000, 1344.8],
  [1639094400, 1345.3],
  [1639353600, 1351.4],
  [1639440000, 1342.6],
  [1639526400, 1338.3],
  [1639612800, 1347.0],
  [1639699200, 1362.9],
  [1639958400, 1358.7],
  [1640044800, 1355.6],
  [1640131200, 1343.3],
  [1640217600, 1346.5],
  [1640304000, 1346.0],
  [1640563200, 1345.4],
  [1640649600, 1344.7],
  [1640736000, 1330.5],
  [1640822400, 1338.0],
  [1640908800, 1333.3],
  [1641168000, 1342.9],
  [1641254400, 1336.5],
  [1641340800, 1346.2],
  [1641427200, 1322.7],
  [1641513600, 1320.7],
  [1641772800, 1323.0],
  [1641859200, 1328.0],
  [1641945600, 1330.8],
  [1642032000, 1325.4],
  [1642118400, 1332.2],
  [1642377600, 1331.8],
  [1642464000, 1337.9],
  [1642550400, 1340.5],
  [1642636800, 1351.4],
  [1642723200, 1355.7],
  [1642982400, 1360.4],
  [1643068800, 1369.9],
  [1643155200, 1358.9],
  [1643241600, 1349.1],
  [1643328000, 1333.1],
  [1643587200, 1338.1],
  [1643673600, 1332.4],
  [1643760000, 1329.6],
  [1643846400, 1317.1],
  [1643932800, 1333.7],
  [1644192000, 1340.2],
  [1644278400, 1344.7],
  [1644364800, 1349.3],
  [1644451200, 1347.9],
  [1644537600, 1346.1],
  [1644796800, 1381.1],
  [1644883200, 1367.1],
  [1644969600, 1371.7],
  [1645056000, 1390.2],
  [1645142400, 1394.0],
  [1645401600, 1392.2],
  [1645488000, 1397.6],
  [1645574400, 1404.8],
  [1645660800, 1458.4],
  [1645747200, 1404.7],
  [1646006400, 1423.4],
  [1646092800, 1439.5],
  [1646179200, 1448.5],
  [1646265600, 1446.4],
  [1646352000, 1471.7],
  [1646611200, 1508.1],
  [1646697600, 1555.3],
  [1646784000, 1511.7],
  [1646870400, 1520.8],
  [1646956800, 1512.0],
  [1647216000, 1497.6],
  [1647302400, 1464.5],
  [1647388800, 1460.9],
  [1647475200, 1481.8],
  [1647561600, 1469.9],
];
export let histData = [];
rawData.forEach(dat => {
  histData.push([dat[0] * 1000, dat[1]]);
});
//console.log('histData ', histData);
