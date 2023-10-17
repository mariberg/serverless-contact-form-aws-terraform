import { createStyles, Container, Group, Anchor, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(15),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  footerLinks: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  footerLinks: { link: string; label: string }[];
}

export function FooterSimple({ footerLinks }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = footerLinks.map((footerLink) => (
    <Anchor<'a'>
      color="dimmed"
      key={footerLink.label}
      href={footerLink.link}
      size="sm"
    >
      {footerLink.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.footerLinks}>{items}</Group>
      </Container>
    </div>
  );
}