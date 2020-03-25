import { makeStyles } from '@material-ui/core/styles'

const useCommonStyles = makeStyles({
    bodyDiv: {
        height: '80vh',
        width: '90vw',
        marginLeft: '1em',
        marginRight: '1em',
        marginTop: "3em",
        marginBottom: "1em",
      },
      mobileBodyDiv: {
        height: '80vh',
        width: '50vw',
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: '8.5em',
        marginTop: "4em",
        marginBottom: "1em",
      }
});


export default useCommonStyles