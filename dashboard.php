	{
		"Lang": "ru",
		"Project": {"Code": "cpc", "Version": 1, "Name": "Caspian Pipeline Construction", "CurTime": "1583222400"},
		"DashPages": 
		[
			{
				"Name": "Page 0",
				"DashItems": [
					{
						"Type": "text",
						"Position": [0, 0, 30, 50],
						"Title": "Summary",
						"Body": "Это текст: прокладка трубопровода, строительство, кровля, возведение зданий и сооружений",
						"FontFamily": "Arial", "FontSize": 20
					},			  
			        {
			        	"Type": "picture",
						"Position": [30, 0, 60, 50],
						"Title": "An image",
						"File": "pic.jpg"
					},
			        {
						"Type": "diagram", "SubType": "graphs", "Form": "bar", 
						"Position": [60, 0, 100, 50], "Title": "Pipes Quantity by Months", "Decimals": 2,
						"Graphs": [
							{
								"Name": "Pipes", "Color": "#ff00ff",
								"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
            				}
          				]
        			},
				  	{
						"Type": "diagram",	"SubType": "graphs", "Form": "line", "FromZero":"yes",
						"Position": [0, 50, 30, 100], "Title": "Pipes Quantity by Months", "Decimals": 2,
						"Graphs": [
							{
								"Name": "Pipes2", "Color": "#ff00ff",
								"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
					  		}
						]
				  	},
				  	{
					"Type": "diagram", "SubType": "pie",
					"Position": [30, 50, 60, 100], "Title": "Resources Quantity: прокладка трубопровода, строительство, кровля, возведение зданий",
					"Graphs": [
					  {
						"Array": [ 
							[7, "Показатель 1", "#ff77ff"], [14, "Показатель 2", "#ff7777"], 
							[19, "Показатель 3", "#77ffff"], [ 9, "Показатель 4", "#7777ff"] 
						]
					  }
					]
				  	},
				  	{
						"Type": "diagram", "SubType": "tornado",
						"Position": [60, 50, 100, 100], "Title": "Resources Quantity",
						"Graphs": [
							{
								"Array": [ 
									[-7, "Парам. 1", "#ff7777"], 
									[14, "Парам. 2", "#77dd77"], 
									[19, "Парам. 3", "#ffee77"], 
									[21, "Парам. 4", "#ffff77"] 
								]
					  		}
						]
				  	}
				]
			},		  
			{
				"Name": "Page 1",
				"DashItems": [
					{
						"Type": "text",
						"Position": [0, 0, 30, 50],
						"Title": "Summary: прокладка трубопровода, строительство, кровля, возведение зданий",
						"Body": "Это текст: прокладка трубопровода, строительство, кровля, возведение зданий и сооружений",
						"FontFamily": "Arial", "FontSize": 20
					},			  
			        {
			        	"Type": "picture",
						"Position": [30, 0, 60, 50],
						"Title": "An image",
						"File": "pic.jpg"
					},
			        {
						"Type": "diagram", "SubType": "graphs", "Form": "bar", 
						"Position": [60, 0, 100, 50], "Title": "Pipes Quantity by Months", "Decimals": 2,
						"Graphs": [
							{
								"Name": "Pipes", "Color": "#ff00ff",
								"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
            				},
							{
								"Name": "Pipes2", "Color": "#ffff00",
								"Array": [ [1582704000, 12.3], [1583164800, 10.7], [1583222400, 8], [1583395200, 0] ]
            				}
          				]
        			},
				  	{
						"Type": "diagram",	"SubType": "graphs", "Form": "line", "FromZero":"yes",
						"Position": [0, 50, 30, 100], "Title": "Pipes Quantity by Months", "Decimals": 2,
						"Graphs": [
							{
								"Name": "Pipes2", "Color": "#ff00ff",
								"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
					  		}
						]
				  	},
				  	{
					"Type": "diagram", "SubType": "pie",
					"Position": [30, 50, 60, 100], "Title": "Resources Quantity",
					"Graphs": [
					  {
						"Array": [ 
							[7, "Показатель 1", "#ff77ff"], [14, "Показатель 2", "#ff7777"], 
							[19, "Показатель 3", "#77ffff"], [ 9, "Показатель 4", "#7777ff"] 
						]
					  }
					]
				  	},
				  	{
						"Type": "diagram", "SubType": "tornado",
						"Position": [60, 50, 100, 100], "Title": "Resources Quantity",
						"Graphs": [
							{
								"Array": [ 
									[-7, "Парам. 1", "#ff7777"], 
									[14, "Парам. 2", "#77dd77"], 
									[19, "Парам. 3", "#ffee77"], 
									[21, "Парам. 4", "#ffff77"] 
								]
					  		}
						]
				  	}
				]
			}
		]
	}
