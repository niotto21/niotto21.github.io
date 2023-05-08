class WordClock {
    static interval;
    static #debug = false;

    static set debugMode(enabled) {
        console.log("debugMode(" + enabled + ")");
        this.#debug = enabled;

        if(enabled) {
            this.stop();
            window.addEventListener('mousemove', this.debug_handleMouseMove);
        } else {
            window.removeEventListener('mousemove', this.debug_handleMouseMove);
            this.start();
        }
    }

    static get debugMode() {
        return this.#debug;
    }

    static debug_handleMouseMove(event) {
        let dateObject = new Date();

        // Set hours and minutes 
        const xRatio = event.offsetX / window.innerWidth;
        const yRatio = event.offsetY / window.innerHeight;

        dateObject.setHours(Math.floor(24 * xRatio));
        dateObject.setMinutes(Math.floor(60 * yRatio));

        WordClock.updateWords(dateObject);
    }

    static updateWords(dateObject = null) {
        WordClock.clearWords();

        if(dateObject === null) {
            dateObject = new Date();
        }
        
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds();
        
        if(seconds == 0) {
            setup(); // This is the setup function in sketch.js
        }
        
        $(".word_minutes").addClass("letter_on");
        // Count minutes past or to hour (change at half hour)
        if(minutes == 0) {
            if(!(hours == 0 || hours == 12 || hours == 24))
            {
                $(".word_minutes").removeClass("letter_on");
                $(".word_minute").removeClass("letter_on");
                $(".word_oclock").addClass("letter_on");
            }
        } else if(minutes > 30) {
            minutes = 60 - minutes;
            hours += 1;
            $(".word_to").addClass("letter_on");
        } else {
            $(".word_past").addClass("letter_on");
        }
        if(minutes == 1) {
            $(".word_minutes").removeClass("letter_on");
            $(".word_minute").addClass("letter_on");
        }

        
        switch(hours)
        {
            case 0:
            case 24:
                // MINUTES (PAST | TO) MIDNIGHT
                $(".word_midnight").addClass("letter_on");
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 23:
            case 24: // Just in case
                // MINUTES (PAST | TO) XXX IN THE NIGHT
                $(".word_in_the").addClass("letter_on");
                $(".word_night").addClass("letter_on");
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                // MINUTES (PAST | TO) XXX IN THE MORNIGN
                $(".word_in_the").addClass("letter_on");
                $(".word_morning").addClass("letter_on");
                break;
            case 12:
                // MINUTES (PAST | TO) NOON
                $(".word_noon").addClass("letter_on");
                break;
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
                // MINUTES (PAST | TO) XXX IN THE AFTERNOON
                $(".word_in_the").addClass("letter_on");
                $(".word_afternoon").addClass("letter_on");
                break;
            case 19:
            case 20:
            case 21:
            case 22:
                // MINUTES (PAST | TO) XXX IN THE EVENING
                $(".word_in_the").addClass("letter_on");
                $(".word_evening").addClass("letter_on");
                break;
        }

        
        switch(minutes) {
            case 0:
                $(".word_minutes").removeClass("letter_on");
                break;
            case 1:
                $(".word_minutes_one").addClass("letter_on");
                break;
            case 2:
                $(".word_minutes_two").addClass("letter_on");
                break;
            case 3:
                $(".word_minutes_three").addClass("letter_on");
                break;
            case 4:
                $(".word_minutes_four").addClass("letter_on");
                break;
            case 5:
                $(".word_minutes_five").addClass("letter_on");
                break;
            case 6:
                $(".word_minutes_six").addClass("letter_on");
                break;
            case 7:
                $(".word_minutes_seven").addClass("letter_on");
                break;
            case 8:
                $(".word_minutes_eight").addClass("letter_on");
                break;
            case 9:
                $(".word_minutes_nine").addClass("letter_on");
                break;
            case 10:
                $(".word_minutes_ten").addClass("letter_on");
                break;
            case 11:
                $(".word_minutes_eleven").addClass("letter_on");
                break;
            case 12:
                $(".word_minutes_twelve").addClass("letter_on");
                break;
            case 13:
                $(".word_minutes_thirteen").addClass("letter_on");
                break;
            case 14:
                $(".word_minutes_fourteen").addClass("letter_on");
                break;
            case 15:
                $(".word_minutes_fifteen").addClass("letter_on");
                break;
            case 16:
                $(".word_minutes_sixteen").addClass("letter_on");
                break;
            case 17:
                $(".word_minutes_seventeen").addClass("letter_on");
                break;
            case 18:
                $(".word_minutes_eighteen").addClass("letter_on");
                break;
            case 19:
                $(".word_minutes_nineteen").addClass("letter_on");
                break;
            case 20:
                $(".word_minutes_twenty").addClass("letter_on");
                break;
            case 21:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_one").addClass("letter_on");
                break;
            case 22:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_two").addClass("letter_on");
                break;
            case 23:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_three").addClass("letter_on");
                break;
            case 24:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_four").addClass("letter_on");
                break;
            case 25:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_five").addClass("letter_on");
                break;
            case 26:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_six").addClass("letter_on");
                break;
            case 27:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_seven").addClass("letter_on");
                break;
            case 28:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_eight").addClass("letter_on");
                break;
            case 29:
                $(".word_minutes_twenty").addClass("letter_on");
                $(".word_minutes_nine").addClass("letter_on");
                break;
            case 30:
                $(".word_minutes_thirty").addClass("letter_on");
                break;
        }

        switch(hours%12) {
            case 0:
            case 12:
                // Either noon or midnight, using specific words for them
                break;
            case 1:
                $(".word_hours_one").addClass("letter_on");
                break;
            case 2:
                $(".word_hours_two").addClass("letter_on");
                break;
            case 3:
                $(".word_hours_three").addClass("letter_on");
                break;
            case 4:
                $(".word_hours_four").addClass("letter_on");
                break;
            case 5:
                $(".word_hours_five").addClass("letter_on");
                break;
            case 6:
                $(".word_hours_six").addClass("letter_on");
                break;
            case 7:
                $(".word_hours_seven").addClass("letter_on");
                break;
            case 8:
                $(".word_hours_eight").addClass("letter_on");
                break;
            case 9:
                $(".word_hours_nine").addClass("letter_on");
                break;
            case 10:
                $(".word_hours_ten").addClass("letter_on");
                break;
            case 11:
                $(".word_hours_eleven").addClass("letter_on");
                break;
        }
        $(".word_it_is").addClass("letter_on");
    }

    static clearWords() {
        $(".letter").removeClass("letter_on");
    }

    static start() {
        WordClock.interval = setInterval(WordClock.updateWords, 1000);
    }

    static stop() {
        clearInterval(WordClock.interval);
    }
}