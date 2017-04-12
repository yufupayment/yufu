
function isValidBrowser()
{
	var iePos = navigator.userAgent.indexOf("MSIE");
	if(iePos == -1) 
	{
		alert("not IE");
		return false;
	}
	else
	{
		var endStr = navigator.userAgent.substring(iePos + 4, navigator.userAgent.length);
		var ieVersion = parseInt(endStr);
		if(ieVersion < 5) 
		{
			alert("Microsoft Internet Explorer 5.0 or upper");
	        return false;			
		}
	}
	return true;
}

var provider = new Array();

function initProvider(cspList)
{
	if(!isValidBrowser())
	{
		return;
	}
	
	var provider = findAllProvider();
	
	var cspindex = 0;
	for (var i=0; i < provider.length; i++) 
	{ 
		var displaycsp = getNameOfCSP(provider[i]);
		if(displaycsp != 0)
		{
			cspList.options[cspindex] = new Option(displaycsp, provider[i]);
			cspindex ++ ;
		}
	}
}

function getStringSplit()
{
	return("@@@@@");
}

function findAllProvider()
{
	i = 0;
	temp = "";
	var provider = new Array();
	var strProvider;

    while(true)
	{
      cenroll.providerType = 1;
		
		try
		{
			temp = cenroll.enumProviders(i,0);
			if(temp == "")
			{
				//alert("temp is null!");
				break;
			}
			provider[i] = temp;
			i = i + 1;
	    }
	    catch(err)
		{
			//alert(err.number);
			break;
		}
    }//while

	return(provider);
}

function getNameOfCSP(csp)
{

	var cspArray = new Array();
	cspArray[0] = "eSEAL-E CSP v1.0@@@@@GFA Key";
	cspArray[1] = "GFA SEAL CSP v1.0@@@@@GFA Key";
	cspArray[2] = "EnterSafe ePass3003 CSP For GFA v1.0@@@@@GFA Key3003";
	cspArray[3] = "FEITIAN ePassNG RSA Cryptographic Service Provider For AoKeXinDe@@@@@GFA Key";
	cspArray[4] = "FEITIAN ePassNG RSA Cryptographic Service Provider@@@@@ GFA Key";
	cspArray[5] = "HaiTai Cryptographic Service Provider@@@@@GFA Key";
	cspArray[6] = "Jiangxin Cryptographic Service Provider v1.0@@@@@GFA Key";
	cspArray[7] = "eSEAL-A200 v1.0@@@@@GFAGFA";
	
	var cspname = 0;
	var flag = 0;
	for(i = 0; i < cspArray.length; i++)
	{
		var strSplit = getStringSplit(); 
		var temp = cspArray[i].split(strSplit);
		if(csp == temp[0])
		{
			cspname = temp[1];
			flag = 1;
			break;
		}	
	}
	if(flag == 0)
	{
		cspname = csp;
	}
	return cspname;
	
}


function createP10(provider,providerType,containerName,exportable,dn) 
{
	//alert("provider:" + provider + "\nproviderType:" + providerType + "\ncontainerName:"+containerName+"\nexportable:" + exportable + "\ndn:"+dn);
	var keyflags = 0;

	cenroll.ProviderName = provider;
	cenroll.ProviderType = providerType;//1
	cenroll.ContainerName = containerName;//label
	cenroll.HashAlgorithm = "SHA1";
	cenroll.KeySpec = 2;
	
	var CRYPT_EXPORTABLE       = 0x00000001; 
	var CRYPT_USER_PROTECTED   = 0x00000002; 
	//alert(CRYPT_USER_PROTECTED);
		
	if(exportable == 1)
	{
	    keyflags = keyflags | CRYPT_EXPORTABLE;
	    keyflags = keyflags | CRYPT_USER_PROTECTED;
	}
	else
	{

	    keyflags = keyflags | CRYPT_USER_PROTECTED;
	}
	var createP10 = "";	
	try 
	{
		cenroll.GenKeyFlags = keyflags;//1; //1024bits

		//alert("in try:" + dn + " \n cenroll.providerName:" + cenroll.providerName);
		createP10 = cenroll.createPKCS10(dn, "1.3.6.1.5.5.7.3.2");
		//alert("createP10:" + createP10);

		if(createP10.length > 0) 
		{
			return createP10;
		} 
		else 
		{
			alert("IE");
			return "";
		}
	} 
	catch (e) 
	{
		if(-2147023673 == e.number) 
		{
			alert("IE");
			return "";
		}
		
		if(-2146893792 == e.number)
		{
			alert(e.description + toHex(e.number));
			return "";
		}
		else 
		{	
			alert( e.description + toHex(e.number));
			try 
			{
				cenroll.GenKeyFlags = 0x02000000 | keyflags; //512bits
				createP10 = cenroll.createPKCS10(dn, "1.3.6.1.5.5.7.3.2");
				if(createP10.length > 0) 
				{
					return createP10;
				} 
				else 
				{
					alert("error");
					return "";
				}
			}
			catch(e) 
			{
				if(-2147023673 == e.number) 
				{
					alert("error");
					return "";
				} 
				else 
				{
					alert("error:" + e.description + toHex(e.number));
					
					try 
					{
						cenroll.GenKeyFlags = 0x0 | keyflags;
						createP10 = cenroll.CreatePKCS10(dn, "1.3.6.1.5.5.7.3.2");
						if(createP10.length > 0) 
						{
							return createP10;
						} 
						else 
						{
							alert("error");
							return "";
						}
					} 
					catch(e) 
					{
						if(-2147023673 == e.number) 
						{
							alert("error");
							return "";
						} 
						else 
						{
							alert("error:" + e.description + toHex(e.number));
							return "";
						}
					}
				}
			}
		}
	}
}

function toHex(num)
{
	n = num < 0 ? -num : num;
	var result;
	
	if(num > 0)
	{
		result = n.toString(16);
		result = result.substr(result.length - 8, 8);
		
		return result;
	}
	
	var b = n.toString(2);
	b = b.replace(/[0]/g, '2');
	b = b.replace(/[1]/g, '0');
	b = b.replace(/[2]/g, '1');
	var len = 48 - b.length;
	for(var i = 0; i < len; i++)
	{
		b = "1" + b;
	}
	
	var t = parseInt(b, 2);
	t = t + 1;
	result = t.toString(16);
	result = result.substr(result.length - 8, 8);
	
	return result;
}

function installCert(cert) 
{
	try 
	{
		//alert('in installCert(): containername=' + cenroll.ContainerName);
		cenroll.DeleteRequestCert = false;
		cenroll.WriteCertToCSP = true;
		//alert(cert);
		cenroll.acceptPKCS7(cert);
		
		//usedProvider = cenroll.ProviderName;
		//userLabel = cenroll.ContainerName;
		
		return true;
	} 
	catch(e) 
	{
		if(-2147023673 == e.number) 
		{
			alert("error");
			return false;
		} 
		else 
		{
			alert("error:" + e.description + toHex(e.number));
			
			return false;
		}
	}
}

function getUsedProvider()
{
	return 	cenroll.ProviderName;
}

function getUserLabel()
{
	//alert(cenroll.ContainerName);
	var label = cenroll.ContainerName.substring(0, cenroll.ContainerName.length-3);
	return 	label;
}

function envSign2(msg)
{
	var signmsg = "";
	certs = document.getElementById("DtsSign").Certificates;
	var certCount = certs.Count;
	
	if (certCount > 0) {
		var selectcert = certs(0);
		
		var validToDate = new Date(selectcert.ValidTo);
		var validFromDate = new Date(selectcert.ValidFrom);
		var currDate = new Date();
		if(validFromDate < currDate && currDate < validToDate){
			signmsg = selectcert.SignMessage(msg, 1);
		}
	}
	return signmsg;
}

function detectUserKey(sn){
	var obj = document.getElementById("DtsSign");
	var certFilter = obj.Filter;
	certFilter.SerialNumber=sn;
	certs = obj.Certificates;
	if(certs == null || certs.Count == 0){
		return 1;
	}
	var selectcert = certs(0);
	var validToDate = new Date(selectcert.ValidTo);
	var validFromDate = new Date(selectcert.ValidFrom);
	var currDate = new Date();
	if(validFromDate > currDate || currDate > validToDate){
		return 2;
	}
	return 0;
}

function createList() {
//	var issuerDN = "CN=OPERATION CA01 FOR GFA TRUST NETWORK TEST, OU=GFA TRUST NETWORK, O=CIECC, L=BETDA, S=BEIJING, C=CN";
	
	var obj = document.getElementById("DtsSign");
	
//	var certFilter = obj.Filter;
//	certFilter.SerialNumber=sn;
	certs = obj.Certificates;
	if(certs == null){
		return;
	}
	var certCount = certs.Count;
	var strCerts = "";
	var selectMenu = document.getElementById("certList");
//	selectMenu.options.length = 0;
	var options = new Array();

	if (certCount == 0) {
		var _option = document.createElement("option");
		_option.value = 0;
		_option.appendChild(document.createTextNode("error"));
		selectMenu.appendChild(_option);
	} else {
		for (var i = 0; i < certCount; i++) {
			strCerts += i + "-";
			strCerts += certs(i).CommonName + "-" + certs(i).KeySpec + "-" + certs(i).KeyUsage;
			options[i] = document.createElement("option");
			options[i].value = certs(i).SerialNumber;

			options[i].appendChild(document.createTextNode(strCerts));
			selectMenu.appendChild(options[i]);
			strCerts = "";
		}
	}
}

