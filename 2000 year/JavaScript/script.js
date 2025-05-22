document.addEventListener("DOMContentLoaded", () => {
    const stone = document.getElementById("stone")
    const stoneMessage = document.getElementById("stone-message")
    const touchStoneBtn = document.getElementById("touch-stone")
    const ripples = document.querySelector(".ripples")
    const timelineMarkers = document.querySelectorAll(".timeline-marker")
    const eraSlider = document.getElementById("era-slider")
    const currentEraDisplay = document.getElementById("current-era")
    const diaryEntries = document.querySelectorAll(".diary-entry")
    const dayNightIndicator = document.getElementById("day-night-indicator")
    const toggleSoundBtn = document.getElementById("toggle-sound")
    const volumeControl = document.getElementById("volume-control")
    const riverAmbient = document.getElementById("river-ambient")
    const digitalClock = document.getElementById("digital-clock")
    const hourHand = document.querySelector(".clock-hour")
    const minuteHand = document.querySelector(".clock-minute")
    const secondHand = document.querySelector(".clock-second")
  
    let currentYear = 2025
    let isSoundPlaying = false
    const stoneMessages = [
        "Я був свідком розквіту і падіння імперій...",
        "Вода формує мене, як час формує все суще...",
        "Я пам'ятаю, коли річка була чистою, ще до того, як люди побудували свої міста...",
        "Якби ви бачили те, що бачив я за два тисячоліття...",
        "Мене торкалися незліченні руки протягом століть...",
        "Пісня річки з віками змінилася, але суть її залишилася...", 
        "Я відчув на собі вагу течії...",
        "Я відчув на собі вагу повеней і спрагу посух...", 
        "Час тече, як вода, постійний і водночас мінливий...",
        "Я був свідком історії, мовчазним, але спостережливим...",
        "Зорі змістилися у своєму танці по нічному небу відтоді, як я вперше прийшов сюди відпочити...", 
        "Зорі змістилися у своєму танці по нічному небу...",
    ]
  
    function updateClocks() {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        
        const formattedHours = hours.toString().padStart(2, '0')
        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')
        digitalClock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        const hourDegrees = (hours % 12) * 30 + minutes * 0.5
        const minuteDegrees = minutes * 6
        const secondDegrees = seconds * 6
        
        hourHand.style.transform = `rotate(${hourDegrees}deg)`
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`
        secondHand.style.transform = `rotate(${secondDegrees}deg)`
    }
    
    // Update clock
    setInterval(updateClocks, 1000)
    updateClocks()
  
    function initDayNightCycle() {
      const hour = new Date().getHours()
      const isDaytime = hour >= 6 && hour < 18
  
      if (isDaytime) {
        dayNightIndicator.style.background = "var(--day-color)"
        dayNightIndicator.style.boxShadow = "0 0 10px rgba(255, 216, 155, 0.7)"
        document.body.classList.remove("night-mode")
      } else {
        dayNightIndicator.style.background = "var(--night-color)"
        dayNightIndicator.style.boxShadow = "0 0 10px rgba(25, 50, 76, 0.7)"
        document.body.classList.add("night-mode")
      }
    }
  
    function createRipple(x, y) {
      const ripple = document.createElement("div")
      ripple.classList.add("ripple")
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripples.appendChild(ripple)
  
      setTimeout(() => {
        ripple.remove()
      }, 2000)
    }
  
    function showStoneMessage() {
      const randomIndex = Math.floor(Math.random() * stoneMessages.length)
      stoneMessage.textContent = stoneMessages[randomIndex]
      stoneMessage.classList.add("visible")
  
      setTimeout(() => {
        stoneMessage.classList.remove("visible")
      }, 5000)
    }
  
    function updateTimelineAndDiary(year) {
      currentYear = Number.parseInt(year)
  
      timelineMarkers.forEach((marker) => {
        const markerYear = Number.parseInt(marker.dataset.year)
        if (markerYear === currentYear) {
          marker.classList.add("active")
          currentEraDisplay.textContent = `Поточна епоха: ${marker.dataset.era}`
        } else {
          marker.classList.remove("active")
        }
      })
  
      diaryEntries.forEach((entry) => {
        const entryYear = Number.parseInt(entry.dataset.year)
        if (entryYear === currentYear) {
          entry.classList.add("active")
        } else {
          entry.classList.remove("active")
        }
      })
    }
  

    //sound
    function initAudio() {
      riverAmbient.volume = volumeControl.value / 100
  
      toggleSoundBtn.addEventListener("click", () => {
        if (isSoundPlaying) {
          riverAmbient.pause()
          toggleSoundBtn.classList.add("muted")
        } else {
          riverAmbient.play()
          toggleSoundBtn.classList.remove("muted")
        }
        isSoundPlaying = !isSoundPlaying
      })
  
      volumeControl.addEventListener("input", function () {
        riverAmbient.volume = this.value / 100
      })
    }
  
    touchStoneBtn.addEventListener("click", () => {
      stone.classList.add("active")
      showStoneMessage()
  
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const x = Math.random() * 300
          const y = Math.random() * 300
          createRipple(x, y)
        }, i * 300)
      }
  
      setTimeout(() => {
        stone.classList.remove("active")
      }, 3000)
    })
  
    stone.addEventListener("click", (e) => {
      const rect = stone.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
  
      createRipple(x, y)
      showStoneMessage()
    })
  
    timelineMarkers.forEach((marker) => {
      marker.addEventListener("click", function () {
        const year = this.dataset.year
        eraSlider.value = year
        updateTimelineAndDiary(year)
      })
    })
  
    eraSlider.addEventListener("input", function () {
      updateTimelineAndDiary(this.value)
    })
  
    initDayNightCycle()
    updateTimelineAndDiary(currentYear)
    initAudio()
  
    setInterval(initDayNightCycle, 60000)


    //secret message, not working
    let clickPattern = [];
    const secretPattern = [1, 3, 2, 1];
    const secretMessage =
      "Ти відкрив давній спогад. Колись я був частиною храмового каменю, вирізьбленого людськими руками, перш ніж мене забрала річка...";
    
    stone.addEventListener("click", (e) => {
      if (e.button !== 0) return;
    
      clickPattern.push("click");
      checkPattern();
    
      showStoneMessage();  
      createRipple(e.offsetX, e.offsetY);
    });
    
    function checkPattern() {
      if (clickPattern.length > 5) {
        clickPattern.shift();
      }
    
      if (
        clickPattern.length === 5 &&
        clickPattern.every((val, index) => val === secretPattern[index])
      ) {
        stoneMessage.textContent = secretMessage;
        stoneMessage.classList.add("visible");
    
        stone.style.boxShadow = "0 0 30px rgba(211, 165, 92, 0.7)";
        setTimeout(() => {
          stone.style.boxShadow = "";
        }, 5000);
    
        clickPattern = [];
      }
    }
  
    setInterval(ambientEffects, 5000)
    
    document.querySelector('.analog-clock').addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    document.querySelector('.analog-clock').addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
})