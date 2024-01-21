import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { MutableRefObject, useRef, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/SearchInput'
import {
  createSelectOption,
  removeClassNameForOverlayAndBody,
  toggleClassNameForOverlayAndBody,
} from '@/utils/common'
import { $setSearchInputZIndex, setSearchInputZIndex } from '@/context/header'
import SearchSvg from '../SearchSvg/SearchSvg'
import styles from '@/styles/Header/index.module.scss'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { getPartsByNameFx, searchPartsFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import { IBoilerPart } from '@/types/boilerParts'
import { useRouter } from 'next/router'
import {
  NoOptionsMessage,
  NoOptionsSpinner,
} from '../SelectOptionsMessage/SelectOptionsMessage'

const SearchInput = () => {
  const mode = useStore($mode)
  const zIndex = useStore($setSearchInputZIndex)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
  const [onMenuOpenControlStyles, setOnMenyOpenControlStyles] = useState({})
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
  const [inputValue, setInputValue] = useState('')
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
  const borderRef = useRef() as MutableRefObject<HTMLButtonElement>
  const [options, setOptions] = useState([])
  const delayCallback = useDebounceCallback(1000)
  const spinner = useStore(searchPartsFx.pending)
  const router = useRouter()

  const handleSearchClick = async () => {
    if (!inputValue) {
      return
    }
    getPartAndRedirect(inputValue)
  }
  const searchParts = async (search: string) => {
    try {
      setInputValue(search)
      const data = await searchPartsFx({ url: '/boiler-parts/search', search })

      const names = data
        .map((item: IBoilerPart) => item.name)
        .map(createSelectOption)
      setOptions(names)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
      return
    }
    setSearchOption(selectedOption)
    removeClassNameForOverlayAndBody()
    const name = (selectedOption as IOption)?.value as string
    if (name) {
      getPartAndRedirect(name)
    }
  }
  const onFocusSearch = () => {
    toggleClassNameForOverlayAndBody('open-search')
    setSearchInputZIndex(100)
  }
  const onSearchInputChange = (text: string) => {
    document.querySelector('.overlay')?.classList.add('open-search')
    document.querySelector('.body')?.classList.add('overflow-hidden')

    delayCallback(() => searchParts(text))
  }
  const onSearchMenuOpen = () => {
    setOnMenyOpenControlStyles({
      borderBottomLeftRadius: 0,
      border: 'none',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    })
    btnRef.current.style.border = 'none'
    btnRef.current.style.borderBottomRightRadius = 'none'
    borderRef.current.style.display = 'block'
  }
  const onSearchMenuClose = () => {
    setOnMenyOpenControlStyles({
      borderBottomLeftRadius: 4,
      boxShadow: 'none',
      border: '1px solid #9e9e9e',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: 'none',
    })
    btnRef.current.style.border = '1px solid #9e9e9e'
    btnRef.current.style.borderBottomRightRadius = '4px'
    btnRef.current.style.borderLeft = 'none'
    borderRef.current.style.display = 'none'
  }

  const getPartAndRedirect = async (name: string) => {
    const part = await getPartsByNameFx({ url: '/boiler-parts/name', name })
    if (!part.id) {
      toast.warning('Товар не найден')
      return
    }
    router.push(`/catalog/${part.id}`)
  }
  return (
    <>
      <div className={styles.header__search__inner}>
        <Select
          components={{
            NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
          }}
          placeholder={'Я ищу...'}
          value={searchOption}
          onChange={handleSearchOptionChange}
          styles={{
            ...inputStyles,
            container: (defaultStyles) => ({
              onMenuOpenContainerStyles,
            }),
            control: (defaultStyles) => ({
              ...controlStyles(defaultStyles, mode),
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
              zIndex,
              transition: 'none',
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222',
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              zIndex,
              marginTop: '-1px',
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode),
            }),
          }}
          isClearable={true}
          openMenuOnClick={false}
          onFocus={onFocusSearch}
          onInputChange={onSearchInputChange}
          onMenuClose={onSearchMenuClose}
          onMenuOpen={onSearchMenuOpen}
          options={options}
        />
        <span className={styles.header__search__border} ref={borderRef}></span>
      </div>
      <button
        className={`${styles.header__search__btn} ${darkModeClass}`}
        ref={btnRef}
        style={{ zIndex }}
        onClick={handleSearchClick}
      >
        <span className={styles.header__search__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  )
}

export default SearchInput
