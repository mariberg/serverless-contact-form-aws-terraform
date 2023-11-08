import React, { useState } from 'react';
import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  Popover
} from '@mantine/core';
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors['ocean-blue'][4]} 0%, ${
      theme.colors['ocean-blue'][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,
    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },
  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: '300px',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  contactDescription: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },
  contact: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },
  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },
  social: {
    color: theme.white,
    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },
  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,
    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },
  inputInvalid: {
    backgroundColor: theme.white,
    borderColor: theme.colors.red[6], 
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },
  inputLabel: {
    color: theme.black,
  },
  control: {
    backgroundColor: theme.colors['ocean-blue'][9],
    '&:hover': {
      backgroundColor: theme.colors['ocean-blue'][1],
    },
  },
}));
interface FormData {
  email: string;
  name: string;
  message: string;
}
  export function ContactUs() {
    const { classes } = useStyles();  
    const [formData, setFormData] = useState<FormData>({
      email: '',
      name: '',
      message: '',
    });
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [opened, setOpened] = useState(false)
  
  

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isEmailValid) {
        console.error('Invalid email address');
        return;
      }
  
      try {
        // Your API endpoint URL
        const apiUrl = 'https://vtr3.execute-api.eu-west-2.amazonaws.com/test'; // Replace with your actual API endpoint URL
  
        // Send the data as JSON
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log(response);
        if (response.ok) {
          // Request successful, do something here
          console.log('Email sent successfully!');
        } else {
          // Request failed, handle errors here
          console.error('Error sending email.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you
          </Text>
          <Text className={classes.contactDescription}>Email: hello@example.com</Text>
            <Text className={classes.contact}>123 Main Street, City</Text>
        </div>
        <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{
              input: isEmailValid ? classes.input : classes.inputInvalid,
              label: classes.inputLabel,
            }}
            value={formData.email}
            onChange={(e) => {
              const email = e.target.value;
              setIsEmailValid(validateEmail(email));
              handleChange('email', email);
            }}
            error={!isEmailValid}
          />
          <TextInput
            label="Name"
            placeholder="Your name"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Textarea
            required
            label="Your message"
            placeholder="Your message"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
          />
          <Group position="right" mt="md">
          <Popover opened={opened} onChange={setOpened}>
            <Popover.Target>
              <Button onClick={(e) => {
                handleSubmit(e);
                setOpened((o) => !o);
              }}>Send message</Button>
            </Popover.Target>

            <Popover.Dropdown>
              <Text size="xs">Your message has been sent</Text>
            </Popover.Dropdown>
          </Popover>

          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}
