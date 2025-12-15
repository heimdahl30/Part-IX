interface NameProps {
  name: string;
}

const Header = (props: NameProps) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

export default Header;
