function HighLightedText({text,from,to,via}){
    return(
        <div className={`bg-gradient-to-r from-[#0052D4] via-[#65C7F7] to-[#9CECFB] text-transparent bg-clip-text`}>
            {text}
        </div>
    )
}

export default HighLightedText;