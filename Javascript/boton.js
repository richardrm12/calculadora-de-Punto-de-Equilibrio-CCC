
const bottom = document.getElementById('bottom')
const message = document.getElementById('question')
const link = document.getElementById('link')

bottom.addEventListener("mouseenter", () => {
    message.style.display = 'block'
    console.log("active")
    message.style.transition = '.8s transform'
})

bottom.addEventListener("mouseleave", () => {
setTimeout(() => {
    console.log("disactive")
    message.style.transition= ".8s transform"
    message.style.display="none"  
    }, 2000);

})

link.addEventListener('click', () => {
    message.style.display = 'none'
})

