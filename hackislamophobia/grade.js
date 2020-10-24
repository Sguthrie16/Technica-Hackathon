// Loads contents first then tells the site what to do after a button is clicked
document.addEventListener('DOMContentLoaded',
function(){
  document.getElementById("start").onclick =()=>{
    get_api_data('https://my-json-server.typicode.com/sguthrie16/Technica-Hackathon/Questions_Quiz')
    };
})
count = 0;
question_type = "";
current_question_one = "";
current_question_two ="";
number_of_questions_one = 0;
number_of_questions_two = 0;

data = "";
current_score =0;
question_id_one = 0;
question_id_two = 0;
answer ="";


// Async await - Getting data from quiz
  let get_api_data = async (api_endpoint) =>{
    results = await fetch(api_endpoint);
    data = await results.json()
      document.getElementById("quiz1").style.display = 'block';
      document.getElementById("start").style.display ="none";
      current_question_one = data[count];
      number_of_questions_one = Object.keys(data).length;
      this.question_type_one = current_question_one.question_type;
      this.question_id_one = current_question_one.id;
      this.answer = current_question_one.correct_answers;
    console.log(current_question_one);
    generate_quiz_one();
}




function generate_quiz_one(){
  console.log(current_question_one);
  if(question_type_one == "Multiple choice"){
    document.getElementById("quiz1").innerHTML = `
    <form>
    <h2>${current_question_one.question}</h2>
      <input type="radio" value = ${current_question_one.options.optiona} name = ${current_question_one.options.optiona} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optiona}> ${current_question_one.options.optiona}</label><br>
      <input type="radio" value = ${current_question_one.options.optionb} name = ${current_question_one.options.optionb} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optionb}>${current_question_one.options.optionb}</label><br>
      <input type="radio" value = ${current_question_one.options.optionc} name = ${current_question_one.options.optionc} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optionc}> ${current_question_one.options.optionc}</label><br>
      <input type="radio" value = ${current_question_one.options.optiond} name=${current_question_one.options.optiond} onclick= "score_tracker(this.value)">
      <label>${current_question_one.options.optiond}</label><br>
    </form>`
  }
  else if (question_type_one == "Multiple selection") {
    document.getElementById("quiz1").innerHTML = `
    <form>
        <h2><b>${current_question_one.question}</b></h2>
        <input type="checkbox" class="answers btn btn-default" name="vehicle1" value="${current_question_one.options.optiona}">
        <label for="vehicle1">${current_question_one.options.optiona}</label><br>
        <input type="checkbox" class="answers btn btn-default" name="vehicle2" value="${current_question_one.options.optionb}">
        <label for="vehicle2"> ${current_question_one.options.optionb}</label><br>
        <input type="checkbox" class="answers btn btn-default" name="vehicle3" value="${current_question_one.options.optionc}">
        <label for="vehicle3"> ${current_question_one.options.optionc}</label><br>
        <input type="checkbox" class="answers btn btn-default" name="vehicle3" value="${current_question_one.options.optiond}">
        <label for="vehicle3"> ${current_question_one.options.optiond}</label><br>
        <button type="button" onclick="compairing_answers()" class="btn btn-default">Submit</button>
      </form>`
}

  return false;
}
function compairing_answers(){
var inputElements = document.getElementsByClassName('answers');
checkedValue = "";
for(var i=0; inputElements[i]; i++){
      if(inputElements[i].checked){
           checkedValue +=inputElements[i].value;
      }
}
score_tracker(checkedValue);
return false;
}

function score_tracker(selected_answer){
  console.log(selected_answer);
  if (answer == selected_answer) {
      current_score = current_score + 1;
        }
    count = count +1;
    console.log(count);
  get_api_data('https://my-json-server.typicode.com/sguthrie16/Technica-Hackathon/Questions_Quiz');
return false;
}
