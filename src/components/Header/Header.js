import './header.css';

function Header() {
  return (
    <div className='header'>
      {/* Logo Brand */}
      <div className='brand'>
        <div className='logomark-con'>
          <p className='logomark'>blk</p>
        </div>
        <p className='name'>blkbox</p>
      </div>

      {/* Right Content */}
      <div className='right'>
        {/* Navigation */}
        <nav>
          <ul>
            <li className='active'>
              Home
            </li>
            <li>Videos</li>
          </ul>
        </nav>

        {/* User Info */}
        <div className='user-info'>
          <div className='circle'>
            <p>EI</p>
          </div>
          <p>Evans Ibok</p>
        </div>
      </div>
    </div>
  )
}

export default Header;
