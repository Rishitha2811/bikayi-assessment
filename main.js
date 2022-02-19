var prizes = undefined;
			var categories = [];
			
			function generateYearsList(){
				var yearsList = document.getElementById('yearsList');
				
				for(var i = 1900 ; i <= 2018 ; i++){
					var option = document.createElement('option');
					var yearText = document.createTextNode(i);
					option.appendChild(yearText);
					yearsList.appendChild(option);
				}
				
			}
			
			function generateCategoriesList(){
				var categoriesList = document.getElementById('categoriesList');
				
				for(var i = 0 ; i < categories.length ; i++){
					var option = document.createElement('option');
					var categoryText = document.createTextNode(categories[i]);
					option.appendChild(categoryText);
					categoriesList.appendChild(option);
				}
				
			}
			
			//function that fetches data from URL
			var getJSON = function(url, callback) {
			    var xhr = new XMLHttpRequest();
			    xhr.open('GET', url, true);
			    xhr.responseType = 'json';
			    xhr.onload = function() {
			      var status = xhr.status;
			      if (status === 200) {
				callback(null, xhr.response);
			      } else {
				callback(status, xhr.response);
			      }
			    };
			    xhr.send();
			};
			
			
			//calling the function that takes data.
			getJSON('http://api.nobelprize.org/v1/prize.json',
			function(err, data) {
			  if (err !== null) {
			    alert('Something went wrong: ' + err);
			  } else {
			    //if we got data successfully, then do below things
			    prizes = data.prizes;
			    generateYearsList();
			    onFilterChange();
			    generateCategoriesList();
			  }
			});
			
			function onFilterChange(){
				
				var prizesList = document.getElementById('prizesList');
			    prizesList.innerHTML = "";
				var selectedYear = document.getElementById('yearsList').value;
				var selectedCategory = document.getElementById('categoriesList').value;
			    
				for (let i = 0; i < prizes.length; i++) {
				  
				  if(!categories.includes(prizes[i].category) && prizes[i].category != undefined){
					categories.push(prizes[i].category);
				  }
				  
				  if(prizes[i].laureates != undefined){
					for(let j = 0 ; j < prizes[i].laureates.length ; j++){
						if(selectedYear !== "Select Year" && selectedCategory == "Select Category"){
							if(prizes[i].year == selectedYear){
								var ul = document.createElement('li');
								var text = document.createTextNode(prizes[i].laureates[j].firstname + " " + prizes[i].laureates[j].surname + " won prize " + prizes[i].laureates[j].motivation + " in category - " + prizes[i].category);
								ul.appendChild(text);
								prizesList.appendChild(ul);
							}								
						}
						
						if(selectedYear == "Select Year" && selectedCategory != "Select Category"){
							if(prizes[i].category == selectedCategory){
								var ul = document.createElement('li');
								var text = document.createTextNode(prizes[i].laureates[j].firstname + " " + prizes[i].laureates[j].surname + " won prize " + prizes[i].laureates[j].motivation + " in category - " + prizes[i].category);
								ul.appendChild(text);
								prizesList.appendChild(ul);
							}								
						}
						
						if(selectedYear == "Select Year" && selectedCategory == "Select Category"){
							var ul = document.createElement('li');
							var text = document.createTextNode(prizes[i].laureates[j].firstname + " " + prizes[i].laureates[j].surname + " won prize " + prizes[i].laureates[j].motivation + " in category - " + prizes[i].category);
							ul.appendChild(text);
							prizesList.appendChild(ul);							
						}
						
						if(selectedYear != "Select Year" && selectedCategory != "Select Category"){
							if(prizes[i].year == selectedYear && prizes[i].category == selectedCategory){
								var ul = document.createElement('li');
								var text = document.createTextNode(prizes[i].laureates[j].firstname + " " + prizes[i].laureates[j].surname + " won prize " + prizes[i].laureates[j].motivation + " in category - " + prizes[i].category);
								ul.appendChild(text);
								prizesList.appendChild(ul);
							}								
						}

					}  
				  }
			    }
			}
