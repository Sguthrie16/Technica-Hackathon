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
      console.log(data[count]);
      current_question_one = data[count];
      console.log(count);
      number_of_questions_one = Object.keys(data).length;
      console.log(number_of_questions_one);
      this.question_type_one = current_question_one.question_type;
      this.question_id_one = current_question_one.id;
      this.answer = current_question_one.correct_answers;
      console.log(answer);
    generate_quiz_one()
}




function generate_quiz_one(){

  if(question_type_one == "Multiple choice"){
    console.log(current_question_one.options.optiona);
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
  else if (question_type_one == "TF") {
    document.getElementById("quiz_one_questions").innerHTML = `
    <form>
    <h2>${current_question_one.question}</h2>
      <input type="radio" value =${current_question_one.options.optiona} name ="true" onclick= "score_tracker(this.value)">
      <label for="true">${current_question_one.options.optiona}</label><br>
      <input type="radio" value = ${current_question_one.options.optionb} name = "false" onclick= "score_tracker(this.value)">
      <label for="false">${current_question_one.options.optionb}</label><br>
    </form>`
}

  return false;
}

function score_tracker(selected_answer){
  console.log(selected_answer);
  if (answer == selected_answer) {
      current_score = current_score + 1;
        }
    count = count +1;
return false;
}
