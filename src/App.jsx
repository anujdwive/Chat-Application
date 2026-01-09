import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [opentDialog, setOpenDialog] = useState(false);
  const [messageDeleteId, setMessageDeleteId] = useState(null);
  const messagesContainerRef = useRef(null);

  // Open Search
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  // Close Search
  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    // Set User Messages
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Set Bot Response
    setTimeout(() => {
      const botResponses = [
        "That's interesting! Tell me more.",
        "I understand. How can I help you with that?",
        "Great question! Let me think about it.",
        "Thanks for sharing!",
        "Is there anything else you'd like to know?",
        "I'm here to help! What else would you like to discuss?",
      ];

      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Highlight Text
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Box
          key={index}
          component='span'
          sx={{
            backgroundColor: "yellow",
            color: "black",
            fontWeight: 600,
            px: 0.5,
            borderRadius: "4px",
          }}>
          {part}
        </Box>
      ) : (
        part
      )
    );
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStartEdit = (message) => {
    console.log("Edit message:", message);
  };

  const handleOpenDeleteDialog = (id) => {
    setOpenDialog(true);
    setMessageDeleteId(id);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setMessageDeleteId(null);
  };

  const handleDelete = () => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageDeleteId));
    setMessageDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* Header */}
      <AppBar position='static' sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          {openSearch ? (
            <>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleCloseSearch}
                sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
              <TextField
                autoFocus
                fullWidth
                variant='standard'
                placeholder='Search messages...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  style: { color: "white", fontSize: "16px" },
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: 1,
                  px: 2,
                  py: 0.5,
                  mr: 1,
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                  "& input::placeholder": {
                    color: "rgba(255,255,255,0.7)",
                    opacity: 1,
                  },
                }}
              />
            </>
          ) : (
            <>
              <SmartToyIcon sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Chat App Demo
              </Typography>
              <IconButton
                edge='end'
                color='inherit'
                onClick={handleOpenSearch}
                sx={{ color: "white" }}>
                <SearchOutlinedIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth='md'
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "600px", // Fixed height for the entire chat container
            overflow: "hidden",
          }}>
          {/* Messages Container - Fixed height with scroll */}
          <Box
            ref={messagesContainerRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "#fafafa",
              height: "calc(100% - 80px)", // Takes remaining space minus input area
              display: "flex",
              flexDirection: "column",
            }}>
            <List sx={{ flex: 1, minHeight: "min-content" }}>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    flexDirection:
                      message.sender === "user" ? "row-reverse" : "row",
                    mb: 2,
                    alignItems: "flex-start",
                    px: 0,
                  }}>
                  <ListItemAvatar sx={{ minWidth: "auto" }}>
                    <Avatar
                      sx={{
                        bgcolor:
                          message.sender === "user" ? "#2196f3" : "#4caf50",
                        ml: message.sender === "user" ? 1 : 0,
                        mr: message.sender === "user" ? 0 : 1,
                        width: 40,
                        height: 40,
                      }}>
                      {message.sender === "user" ? (
                        <PersonIcon />
                      ) : (
                        <SmartToyIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      maxWidth: "70%",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems:
                        message.sender === "user" ? "flex-end" : "flex-start",

                      "&:hover .message-actions": {
                        opacity: 1,
                      },
                    }}>
                    {message.sender === "user" && (
                      <Box
                        className='message-actions'
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: message.sender === "user" ? -10 : "auto",
                          left: message.sender === "user" ? "auto" : -10,
                          opacity: 0,
                          transition: "opacity 0.2s ease",
                          display: "flex",
                          gap: 0.5,
                          bgcolor: "#fff",
                          borderRadius: 1,
                          boxShadow: 1,
                          p: 0.25,
                          zIndex: 1,
                        }}>
                        <IconButton
                          size='small'
                          onClick={() => handleStartEdit(message)}
                          sx={{ color: "#1976d2" }}>
                          <EditIcon fontSize='small' />
                        </IconButton>

                        <IconButton
                          size='small'
                          onClick={() => handleOpenDeleteDialog(message.id)}
                          sx={{ color: "#d32f2f" }}>
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </Box>
                    )}

                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor:
                          message.sender === "user" ? "#2196f3" : "#ffffff",
                        color:
                          message.sender === "user" ? "#ffffff" : "#000000",
                        borderRadius: 2,
                        wordBreak: "break-word",
                      }}>
                      <Typography variant='body1'>
                        {highlightText(
                          message.text,
                          openSearch ? searchTerm : ""
                        )}
                      </Typography>
                    </Paper>
                    <Typography
                      variant='caption'
                      sx={{
                        mt: 0.5,
                        opacity: 0.7,
                        px: 1,
                      }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
              {/* Typing Indicator */}
              {isTyping && (
                <Fade in={isTyping}>
                  <ListItem
                    sx={{
                      flexDirection: "row",
                      mb: 2,
                      alignItems: "flex-start",
                      px: 0,
                    }}>
                    <ListItemAvatar sx={{ minWidth: "auto" }}>
                      <Avatar
                        sx={{
                          bgcolor: "#4caf50",
                          mr: 1,
                          width: 40,
                          height: 40,
                        }}>
                        <SmartToyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          bgcolor: "#ffffff",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}>
                        <Typography variant='body2' sx={{ color: "#666" }}>
                          Bot is typing
                        </Typography>
                        <CircularProgress size={16} thickness={4} />
                      </Paper>
                    </Box>
                  </ListItem>
                </Fade>
              )}
            </List>
          </Box>

          {/* Input Area - Fixed at bottom */}
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              gap: 1,
              bgcolor: "#ffffff",
              height: "80px", // Fixed height for input area
              flexShrink: 0,
            }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Type your message...'
              multiline
              maxRows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              variant='contained'
              sx={{
                minWidth: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
                "&:disabled": {
                  bgcolor: "#bdbdbd",
                },
              }}
              disabled={inputText.trim() === ""}
              onClick={handleSendMessage}>
              <SendIcon />
            </Button>
          </Box>
        </Paper>

        {/* Info Section */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant='body2' color='text.secondary'>
            This is a demo chat app. Messages are stored locally. Type a message
            and press Enter or click Send!
          </Typography>
        </Box>
      </Container>

      <Dialog
        open={opentDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' color='error'>
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are Sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={handleDelete} autoFocus color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
