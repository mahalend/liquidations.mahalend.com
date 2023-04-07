import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {createStyles, makeStyles, Theme, useTheme, withStyles, WithStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiDialogContent from '@material-ui/core/DialogContent';

import IconLoader from "../IconLoader";
import TextWrapper from '../TextWrapper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      borderRadius: 0,
      padding: '28px',
      color: 'white',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    closeButton: {
      position: 'absolute',
      right: '20px',
      top: "16px",
      color: theme.palette.grey[500],
    },

  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  titleLogo?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  modalTitleStyle?: any;
  closeButton?: boolean;
  title: string;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {children, classes, onClose, titleLogo, modalTitleStyle, closeButton, title, ...other} = props;
  return (
    <MuiDialogTitle style={modalTitleStyle} disableTypography className={classes.root} {...other}>
      <div className="dialog-class width-100">
        {titleLogo && titleLogo}
        <TextWrapper
          text={title}
          fontSize={18}
          fontWeight={600}
          align={'center'}
          className={'p-l-16 p-r-16'}
        />
      </div>
      {closeButton ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <IconLoader iconName={'Cross'} iconType="misc"/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(() => ({
  root: {
    minWidth: 480,
    background: 'linear-gradient(180deg, #48423E 0%, #373030 100%)',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '24px 32px',
  },
  dividers: {
    borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
  },
  '@media (max-width: 600px)': {
    root: {
      width: '100%',
      minWidth: '350px',
      maxHeight: '60%',
      padding: '24px 16px',
    },
  },
}))(MuiDialogContent);

interface props {
  children: React.ReactNode;
  title?: string;
  handleClose?: Function;
  open?: boolean;
  titleLogo?: React.ReactNode;
  modalContainerStyle?: any;
  modalTitleStyle?: any;
  modalBodyStyle?: any;
  closeButton?: boolean;
  mobile?: boolean;
}

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(180deg, #48423e 0%, #373030 100%)',
    boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.12)',
    borderRadius: '6px !important',
    maxWidth: '496px',
  },
  halfScreen: {},
  customPaper: {},

  '@media (max-width: 600px)': {
    root: {
      marginTop: '250px !important',
      borderRadius: '6px 6px 0 0 !important',
    },
    halfScreen: {
      height: 'auto',
      maxHeight: 'calc(100vh - 72px)',
      width: '100%',
      borderRadius: '6px 6px 0px 0px !important'
    },
    customPaper: {
      alignItems: 'flex-end',
    },
  },
});

const Modal: React.FC<props> = ({
                                  children,
                                  title,
                                  handleClose,
                                  open,
                                  titleLogo,
                                  modalContainerStyle,
                                  modalTitleStyle,
                                  modalBodyStyle,
                                  closeButton,
                                  mobile = false,
                                }) => {
  const [openModal, setOpen] = React.useState(open);

  const theme = useTheme();
  const modalStyles = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseModal = () => {
    if (handleClose) {
      handleClose();
    }
  };

  if (open !== openModal) {
    setOpen(open);
  }

  let modalJsx = <div/>;
  if (openModal) {
    modalJsx = (
      <Dialog
        style={modalContainerStyle}
        fullScreen={fullScreen}
        fullWidth={mobile}
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        classes={{
          paper: modalStyles.root,
          paperFullScreen: modalStyles.halfScreen,
          scrollPaper: modalStyles.customPaper,
        }}
      >
        {title && <DialogTitle
          closeButton={closeButton}
          modalTitleStyle={{
            display: 'flex',
            color: 'rgba(255, 255, 255, 0.88)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '28px ',
            borderBottom: '1px solid #ffffff08',
            ...modalTitleStyle
          }}
          id='customized-dialog-title'
          onClose={handleCloseModal}
          titleLogo={titleLogo}
          title={title}
        >
          {title}
        </DialogTitle>}
        <DialogContent style={{
          ...modalBodyStyle
        }} dividers>
          <div style={{}}>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return modalJsx;
};


export default Modal;
