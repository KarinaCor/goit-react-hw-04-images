import * as SC from '../Button/Button.styled'

export const Button = ({onClick}) => {
    return(
<SC.Button type="button" onClick={onClick}>
       Load More!
    </SC.Button>
    )
    
}