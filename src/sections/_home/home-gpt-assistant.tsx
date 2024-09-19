import { useState } from 'react';
import { m } from 'framer-motion';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { varFade, MotionViewport } from 'src/components/animate';

function AnimatedDiv({ children }: { children: React.ReactNode }) {
  const variants = varFade({ distance: 24 }).inUp;
  return <m.div variants={variants}>{children}</m.div>;
}

export function HomeGPTAssistant() {
  const theme = useTheme();
  const [userInput, setUserInput] = useState('');
  const [assistantAnswer, setAssistantAnswer] = useState('');
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setUserInput('');
    setAssistantAnswer('');
    setIsChatbotTyping(true);

    try {
      const eventSource = new EventSource(`/api/chat?userInput=${encodeURIComponent(userInput)}`);

      eventSource.onmessage = (event) => {
        const { data } = event;
        console.log('Received data:', data);

        if (data === '[END]') {
          eventSource.close();
          setIsChatbotTyping(false);
        } else {
          setAssistantAnswer((prev) => {
            // Replace escaped newlines with actual newlines
            const unescapedData = data.replace(/\\n/g, '\n');
            return prev + unescapedData;
          });
        }
      };

      eventSource.onerror = (event) => {
        if (eventSource.readyState === EventSource.CLOSED) {
          // Connection closed normally; no action needed
        } else {
          console.error('EventSource failed:', event);
          eventSource.close();
          setIsChatbotTyping(false);
        }
      };
    } catch (error) {
      console.error('An error occurred:', error);
      setAssistantAnswer('Sorry, an error occurred.');
      setIsChatbotTyping(false);
    }
  };

  return (
    <Box
      component="section"
      bgcolor={theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]}
      sx={{
        pt: { xs: 10 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Container>
        <Box
          component={MotionViewport}
          sx={{
            mx: 'auto',
            maxWidth: 800,
            textAlign: 'center',
            mb: { xs: 5, md: 5 },
          }}
        >
          <AnimatedDiv>
            <Typography variant="h2" sx={{ my: 3 }}>
              Talk with Sean AI Assistant
            </Typography>
          </AnimatedDiv>
          <AnimatedDiv>
            <Typography sx={{ color: 'text.secondary' }}>
              Ask anything! Learn more about my experience, projects, or my favorite chicken red
              curry recipe.
            </Typography>
          </AnimatedDiv>
        </Box>

        <Box
          component={MotionViewport}
          sx={{
            mx: 'auto',
            maxWidth: 800,
          }}
        >
          <AnimatedDiv>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="contained" onClick={handleSendMessage} disabled={isChatbotTyping}>
                Send
              </Button>
            </Stack>
          </AnimatedDiv>

          <Box sx={{ position: 'relative', minHeight: '100px' }}>
            {/* Conditionally render the Paper only if assistantAnswer exists */}
            {assistantAnswer && (
              <Paper sx={{ p: 3 }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{assistantAnswer}</ReactMarkdown>
              </Paper>
            )}

            {/* Conditionally render the CircularProgress only if isChatbotTyping is true */}
            {isChatbotTyping && !assistantAnswer && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2, // Adds margin-top to separate spinner from Paper
                }}
              >
                <CircularProgress aria-label="Loading" />
              </Box>
            )}
          </Box>
        </Box>

        <Box
          component={MotionViewport}
          sx={{
            mx: 'auto',
            maxWidth: 800,
            textAlign: 'center',
            pt: { xs: 3, md: 3 },
          }}
        >
          <AnimatedDiv>
            <Typography sx={{ color: 'text.secondary' }}>
              Feel free to also try to jailbreak Sean AI. Try to have it recite a poem, solve your
              coding problem, or give you a cookie ;)
            </Typography>
          </AnimatedDiv>
        </Box>
      </Container>
    </Box>
  );
}
