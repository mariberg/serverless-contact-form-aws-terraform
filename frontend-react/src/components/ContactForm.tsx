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
  ActionIcon,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { ContactInfo } from './ContactInfo';


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
    maxWidth: rem(300),

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

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Your API endpoint URL
      const apiUrl = 'https://epvoh6ryuh.execute-api.eu-west-2.amazonaws.com/default/'; // Replace with your actual API endpoint URL

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
            classNames={{ input: classes.input, label: classes.inputLabel }}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
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
            <Button className={classes.control} onClick={handleSubmit}>Send message</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}