function Link(props) {
  return (
    <a className={'mt-4 mb-4 pl-5 pr-5 ' + props.class}>
      {props.children}
    </a>
  )
}

export default Link;