<?php print_r($_POST);
/*
array_filter($_POST, 'trim_value');    // the data in $_POST is trimmed

if( $_POST['tournament'] ) {

    $tournamentSanitized = filter_var($_POST['tournament'], FILTER_SANITIZE_STRING);
    if(filter_var($tournamentSanitized, FILTER_VALIDATE_STRING){
        $tournament = htmlentities($tournamentSanitized, ENT_QUOTES, 'UTF-8');
    } else {
        filter_var($tournamentSanitized, FILTER_VALIDATE_STRING);
    }
}

if( $_POST['pitcher_A_nhpa_number'] ) {

    $pitcherAnhpanumberSanitized = filter_var($_POST['tournament'], FILTER_SANITIZE_NUMBER_INT);
    if(filter_var($pitcherAnhpanumberSanitized, FILTER_VALIDATE_INT){
        $pitcher_A_nhpa_number = htmlentities($pitcherAnhpanumberSanitized, ENT_QUOTES, 'UTF-8');
    } else{
        filter_var($pitcherAnhpanumberSanitized, FILTER_VALIDATE_INT);
    }
}

if( $_POST['email'] ) {

    $emailSanitized = filter_var($_POST['tournament'], FILTER_SANITIZE_EMAIL);
    if(filter_var($emailSanitized, FILTER_VALIDATE_EMAIL)) {
        $email = htmlentities($emailSanitized, ENT_QUOTES, 'UTF-8');
    }else{
        //email did not validate = false
        filter_var($emailSanitized, FILTER_VALIDATE_EMAIL);
    }


Array
(
    [date] => 2020-07-18
    [tournament] => Swamp Holler Invitational
    [class] => A
    [game] => 1
    [court] => 2
    [scoreKeepersFullName] => George Jetson
    [pitcher_A_nhpa_number] => 1001
    [pitcherAlastName] => Kane
    [pitcherAfirstName] => Phil
    [pitcherAstate] => WA
    [pitcherAdiv] => Open Men
    [pitcher_B_nhpa_number] => 1002
    [pitcherBlastName] => Gifford
    [pitcherBfirstName] => Jeremiah
    [pitcherBstate] => Wa
    [pitcherBdiv] => Open Men
    [pitcher_A_total_Score] => 9
    [pitcher_A_total_Ringers] => 7
    [pitcher_A_total_Singles] => 3
    [pitcher_A_ringer_average] => 43.75
    [pitcher_B_total_Score] => 11
    [pitcher_B_total_Ringers] => 8
    [pitcher_B_total_Singles] => 2
    [pitcher_B_ringer_average] => 50.00
    [total_shoes_pitched] => 16
    [proof] => OK
    [username] => pkane
)
*/