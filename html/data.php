	{
		"Lang": "ru",
		"Project": {"Code": "cpc", "Version": 1, "Name": "Caspian Pipeline Construction", "CurTime": "10.10.99  08:00"},
		"DashPages": 
		[
			{
				"Name": "Page 0",
				"DashItems": [
					{
						"Type": "text",
						"Position": [100, 100, 500, 200],
						"Title": "Summary",
						"Body": "Это текст: прокладка трубопровода, строительство, кровля, возведение зданий и сооружений",
						"FontFamily": "Arial", "FontSize": 20
					},			  
			        {
			        	"Type": "picture",
						"Position": [100, 100, 500, 200],
						"Title": "An image",
						"File": "pic.jpg"
					},
			        {
						"Type": "diagram", "SubType": "graphs", "Form": "bar",
						"Position": [100, 100, 500, 200], "Title": "Pipes Quantity by Months",
						"Graphs": [
							{
								"Name": "Pipes", "Color": "#ff00ff",
								"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
            				}
          				]
        			},
				  	{
						"Type": "diagram",	"SubType": "graphs", "Form": "line", "FromZero":"no",
						"Position": [10, 10, 60, 60], "Title": "Pipes Quantity by Months",
						"Graphs": [
							{
								"Name": "Pipes2", "Color": "#ff00ff",
								"Array": [ [15, 10.3], [16, 15.7], [17, 34], [18, 0] ]
					  		}
						]
				  	},
				  	{
					"Type": "diagram", "SubType": "pie",
					"Position": [30, 30, 90, 90], "Title": "Resources Quantity",
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
						"Position": [10, 30, 60, 90], "Title": "Resources Quantity",
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
				"Type": "diagram", "SubType": "graphs", "Position": [10, 10, 80, 80], "Title": "Pipes Quantity by Months",
				"Graphs": [
					{
					"Name": "graph 1", "Color": "#ff00ff",
					"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
					},
					{
					"Name": "graph 2", "Color": "#0000ff",
					"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
					}
				]
				},
				{
				"Type": "diagram", "SubType": "graphs", "Position": [40, 40, 90, 90],
				"Title": "Resources Quantity by Months",
				"Graphs": [
					{
					"Name": "graph 3", "Color": "#ff00ff",
					"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
					},
					{
					"Name": "graph 4", "Color": "#0000ff",
					"Array": [ [1582704000, 10.3], [1583164800, 15.7], [1583222400, 34], [1583395200, 0] ]
					}
				]
				}
			]
			},
			{
				"Name": "Page 2",
				"DashItems": [
					{
					"Type": "diagram", "SubType": "graphs", "Position": [10, 10, 70, 70], "Title": "Pipes Quantity by Months",
					"Graphs": [
						{
						"Name": "graph 1", "Color": "#ff00ff",
						"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
						},
						{
						"Name": "graph 2", "Color": "#0000ff",
						"Array": [ [2.5, 20.3], [4.1, 17.7], [5, 63] ]
						}
					]
					},
					{
					"Type": "diagram", "SubType": "graphs", "Position": [40, 40, 90, 90],
					"Title": "Resources Quantity by Months",
					"Graphs": [
						{
						"Name": "graph 3", "Color": "#ff00ff",
						"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
						},
						{
						"Name": "graph 4", "Color": "#0000ff",
						"Array": [ [2.5, 20.3], [4.1, 17.7], [5, 63] ]
						}
					]
					}
				]
			}
		]
	}
