'use client'

import Link from 'next/link'
import { useState } from 'react'
import './StaggeredMenu.css'

type MenuItem = {
  label: string
  ariaLabel?: string
  link: string
}

type SocialItem = {
  label: string
  link: string
}

type StaggeredMenuProps = {
  position?: 'left' | 'right'
  items: MenuItem[]
  socialItems?: SocialItem[]
  displaySocials?: boolean
  logoUrl?: string
}

const StaggeredMenu = ({
  position = 'right',
  items,
  socialItems = [],
  displaySocials = true,
  logoUrl = '/icon.svg',
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="staggered-menu-wrapper fixed-wrapper"
      data-open={open ? 'true' : undefined}
      data-position={position}
    >
      <header className="staggered-menu-header">
        <div className="sm-logo">
          <img src={logoUrl} alt="DIC logo" className="sm-logo-img" />
        </div>
        <button
          type="button"
          className="sm-toggle"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sm-toggle-textWrap">
            <span className="sm-toggle-textInner">
              <span className="sm-toggle-line">{open ? 'Close' : 'Menu'}</span>
            </span>
          </span>
        </button>
      </header>

      {open && (
        <aside className="staggered-menu-panel" data-position={position}>
          <div className="sm-panel-inner">
            <h2 className="sm-panel-title">Navigate</h2>
            <ul className="sm-panel-list" data-numbering="true">
              {items.map((item) => (
                <li key={item.link} className="sm-panel-itemWrap">
                  <Link
                    href={item.link}
                    aria-label={item.ariaLabel ?? item.label}
                    className="sm-panel-item"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials">
                <p className="sm-socials-title">Connect</p>
                <ul className="sm-socials-list">
                  {socialItems.map((s) => (
                    <li key={s.link}>
                      <a href={s.link} target="_blank" rel="noreferrer" className="sm-socials-link">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  )
}

export default StaggeredMenu

